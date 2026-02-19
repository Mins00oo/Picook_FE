import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, {
  setAccessTokenGetter,
  setRefreshSessionGetter,
  setLogoutGetter,
} from "../api/client";
import { AUTH } from "../api/endpoints";
import {
  getProfile as getKakaoProfile,
  login as loginWithKakao,
  logout as logoutKakao,
  unlink as unlinkKakao,
} from "@react-native-seoul/kakao-login";

/*
  [Auth Store - Backend JWT 구조]
  프론트 인증 흐름:
  1) 카카오 SDK 로그인으로 Kakao Access Token 획득
  2) 백엔드로 토큰 교환 요청
     - POST /api/auth/kakao/mobile
       body: { accessToken: "<kakao_access_token>" }
       response 예시:
       {
         "accessToken": "...",   // 서버 JWT(access)
         "refreshToken": "...",  // 서버 JWT(refresh)
         "user": { "id": 1, "nickname": "...", "email": "...", "profileImage": "..." }
       }
  3) 이후 API 호출은 서버 JWT(access)를 Authorization 헤더로 사용
  4) access 만료 시 refresh로 재발급
     - POST /api/auth/refresh
       body: { refreshToken: "<server_refresh_token>" }
  5) 로그아웃
     - POST /api/auth/logout
       body: { refreshToken: "<server_refresh_token>" }
*/
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      authProvider: null, // "Kakao" | "Naver" | "Google" | null
      accessToken: null, // 서버 JWT access token
      refreshToken: null, // 서버 JWT refresh token
      isLoading: false,

      getAuthHeader: () => {
        const token = get().accessToken;
        return token ? { Authorization: `Bearer ${token}` } : {};
      },

      login: async (provider) => {
        set({ isLoading: true });

        try {
          if (provider !== "Kakao") {
            // TODO: Naver/Google 백엔드 소셜 로그인 추가 시 이 분기 확장
            throw new Error("현재 카카오 로그인만 연동되어 있습니다.");
          }

          // 카카오톡 앱 로그인 우선, 불가 시 계정 로그인으로 자동 fallback
          const kakaoToken = await loginWithKakao();
          const kakaoProfile = await getKakaoProfile();

          // 백엔드 토큰 교환 엔드포인트
          const response = await api.post(AUTH.KAKAO_MOBILE, {
            accessToken: kakaoToken.accessToken,
          });

          const data = response.data || {};
          const serverAccessToken = data.accessToken;
          const serverRefreshToken = data.refreshToken;

          if (!serverAccessToken || !serverRefreshToken) {
            throw new Error("백엔드 토큰 교환 응답이 올바르지 않습니다.");
          }

          const serverUser = data.user || {
            id: kakaoProfile.id,
            nickname: kakaoProfile.nickname || "카카오 사용자",
            email: kakaoProfile.email || null,
            profileImage:
              kakaoProfile.profileImageUrl ||
              kakaoProfile.thumbnailImageUrl ||
              null,
          };

          set({
            user: serverUser,
            authProvider: "Kakao",
            accessToken: serverAccessToken,
            refreshToken: serverRefreshToken,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // 앱 재실행 후 필요 시 호출: refresh token으로 세션 복구
      refreshSession: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return false;

        try {
          const response = await api.post(AUTH.REFRESH, {
            refreshToken,
          });
          const data = response.data || {};

          if (!data.accessToken || !data.refreshToken) {
            throw new Error("토큰 재발급 응답이 올바르지 않습니다.");
          }

          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user || get().user,
          });
          return true;
        } catch (error) {
          // refresh 실패 시 로컬 세션 정리
          set({
            user: null,
            authProvider: null,
            accessToken: null,
            refreshToken: null,
          });
          return false;
        }
      },

      // 선택: 동의 해제까지 포함한 "완전 탈퇴" 성격 동작
      unlinkKakaoAccount: async () => {
        try {
          await unlinkKakao();
        } catch (error) {
          // unlink 실패여도 앱 세션은 정리
        } finally {
          set({
            user: null,
            authProvider: null,
            accessToken: null,
            refreshToken: null,
          });
        }
      },

      logout: async () => {
        const { authProvider, refreshToken } = get();

        // 백엔드 로그아웃(리프레시 토큰 폐기)
        // 엔드포인트: POST /api/auth/logout
        try {
          if (refreshToken) {
            await api.post(AUTH.LOGOUT, { refreshToken });
          }
        } catch (error) {
          // 서버 로그아웃 실패해도 로컬 세션 정리는 진행
        }

        // 카카오 SDK 로그아웃 (동의 기록은 유지됨)
        if (authProvider === "Kakao") {
          logoutKakao().catch(() => null);
        }

        set({
          user: null,
          authProvider: null,
          accessToken: null,
          refreshToken: null,
          isLoading: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // 로딩 상태는 영속화 금지: 앱 재실행 시 무한 로딩 방지
      partialize: (state) => ({
        user: state.user,
        authProvider: state.authProvider,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    },
  ),
);

setAccessTokenGetter(() => useAuthStore.getState().accessToken);
setRefreshSessionGetter(() => useAuthStore.getState().refreshSession());  // ()로 호출까지 실행
setLogoutGetter(() => useAuthStore.getState().logout());                 // ()로 호출까지 실행
