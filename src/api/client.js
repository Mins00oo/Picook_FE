import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "../config/env";
import { AUTH } from "./endpoints";

let accessTokenGetter = null;
let refreshSessionGetter = null;
let logoutGetter = null;

export const setAccessTokenGetter = (getter) => {
  accessTokenGetter = getter;
};

export const setRefreshSessionGetter = (getter) => {
  refreshSessionGetter = getter;
};

export const setLogoutGetter = (getter) => {
  logoutGetter = getter;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request: 엑세스 토큰을 Authorization 헤더에 자동 주입
apiClient.interceptors.request.use(
  (config) => {
    const token = accessTokenGetter?.();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: 401 시 리프레시 시도 → 재발급 성공 시 원본 요청 재시도, 실패 시 로그아웃
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401이 아니거나, 이미 retry한 요청이면 그대로 reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // refresh 엔드포인트에서 401 = 리프레시 토큰 만료 → 로그아웃
    const isRefreshRequest =
      typeof originalRequest.url === "string" &&
      originalRequest.url?.includes(AUTH.REFRESH);

    if (isRefreshRequest) {
      logoutGetter?.();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // 이미 refresh 중이면 큐에 넣고 대기 후 재시도
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => apiClient(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const success = await refreshSessionGetter?.();
      if (success) {
        processQueue(null);
        return apiClient(originalRequest);
      }
      logoutGetter?.();
      processQueue(error, null);
      return Promise.reject(error);
    } catch (e) {
      logoutGetter?.();
      processQueue(e, null);
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
export { API_BASE_URL, API_TIMEOUT_MS };
