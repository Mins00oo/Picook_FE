import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
  [Auth Store]
  - user: 사용자 정보 (null이면 비로그인)
  - login: 로그인 처리 (API 연동 전까지는 Mocking)
  - logout: 로그아웃 처리
*/
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // 초기값: 로그인 안 됨
      isLoading: false,

      // 로그인 액션 (나중에 여기에 API 연동 코드가 들어갑니다)
      login: async (provider) => {
        set({ isLoading: true });

        try {
          // --- [API 연동 포인트] ---
          // const apiKey = process.env.EXPO_PUBLIC_KAKAO_APP_KEY;
          // const response = await api.post('/login', { provider });
          // const userData = response.data;

          // [임시] 가짜 데이터로 로그인 성공 처리 (1초 딜레이)
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser = {
            id: 1,
            nickname: "민수",
            email: "picook@admin.com",
            provider: provider,
            profileImage: null,
          };

          set({ user: mockUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
        }
      },

      // 로그아웃 액션
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", // 저장소 이름
      storage: createJSONStorage(() => AsyncStorage), // AsyncStorage 사용
    }
  )
);
