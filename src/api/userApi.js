import api from "./client";
import { USERS } from "./endpoints";
import { getApiData } from "./apiResponse";

/**
 * GET /api/users/me - 내 정보 조회
 * @returns {Promise<{ id: number, nickname: string, email: string|null, profileImage: string|null }>}
 * @throws {ApiError} 4xx/5xx 시 (401은 인터셉터에서 refresh/로그아웃 처리)
 */
export async function getMyProfile() {
  const response = await api.get(USERS.ME);
  return getApiData(response);
}
