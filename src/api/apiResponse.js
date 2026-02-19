/**
 * 백엔드 ApiResponse 공통 처리
 * 형식: { success, code, data, message, timestamp, errors }
 */

/**
 * API 에러 전용 클래스
 * - code: 백엔드 에러 코드 (예: U005, U006)
 * - success: false
 * - message: 서버 메시지
 * - response: 원본 axios response (선택)
 */
export class ApiError extends Error {
  constructor(message, code, success, response) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.success = success;
    this.response = response;
  }
}

/**
 * ApiResponse 래퍼에서 data 추출
 * @param {import("axios").AxiosResponse} response
 * @returns {*} response.data.data
 * @throws {ApiError} success === false 이거나 data가 없을 때
 */
export function getApiData(response) {
  const body = response?.data ?? {};
  if (body.success === true && body.data != null) {
    return body.data;
  } else {
    throw new ApiError(body.message, body.code, body.success, response);
  }
}
