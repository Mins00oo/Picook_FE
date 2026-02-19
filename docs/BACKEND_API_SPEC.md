# Picook 백엔드 API 연동 명세서

> 프론트엔드(React Native/Expo) 기준 인증·API 연동 스펙입니다. 백엔드 구현 시 이 명세를 따르면 됩니다.

---

## 1. 개요

- **인증 방식**: 카카오 소셜 로그인 → 백엔드 JWT(access + refresh)
- **헤더**: `Authorization: Bearer <accessToken>`
- **401 처리**: 프론트가 자동으로 refresh 시도 → 실패 시 로그아웃 처리

---

## 2. 인증 흐름

```
1. 사용자 카카오 로그인 (카카오 SDK)
2. 프론트: 카카오 Access Token 획득
3. 프론트 → 백엔드: POST /api/auth/kakao/mobile { accessToken }
4. 백엔드: 카카오 토큰 검증 → JWT(access, refresh) 발급 → 응답
5. 이후 API: Authorization: Bearer <accessToken>
6. 401 수신 시: 프론트가 POST /api/auth/refresh 자동 호출 → 성공 시 재시도, 실패 시 로그아웃
```

---

## 3. API 엔드포인트

### 3.1 카카오 로그인 (토큰 교환)

| 항목 | 값 |
|------|-----|
| Method | `POST` |
| Path | `/api/auth/kakao/mobile` |
| Content-Type | `application/json` |

**Request Body**
```json
{
  "accessToken": "카카오_발급_access_token"
}
```

**Response (200 OK)**
```json
{
  "accessToken": "서버_JWT_access_token",
  "refreshToken": "서버_JWT_refresh_token",
  "user": {
    "id": 1,
    "nickname": "사용자 닉네임",
    "email": "user@example.com",
    "profileImage": "https://..."
  }
}
```

**프론트 요구사항**
- `accessToken`, `refreshToken` 필수
- `user` 없으면 프론트가 카카오 프로필로 보완 가능 (선택)

---

### 3.2 토큰 재발급 (Refresh)

| 항목 | 값 |
|------|-----|
| Method | `POST` |
| Path | `/api/auth/refresh` |
| Content-Type | `application/json` |

**Request Body**
```json
{
  "refreshToken": "서버_JWT_refresh_token"
}
```

**Response (200 OK)**
```json
{
  "accessToken": "새_서버_JWT_access_token",
  "refreshToken": "새_서버_JWT_refresh_token",
  "user": {
    "id": 1,
    "nickname": "사용자 닉네임",
    "email": "user@example.com",
    "profileImage": "https://..."
  }
}
```

**프론트 동작**
- 이 엔드포인트가 401을 반환하면 → refresh 토큰 만료로 간주 → **로그아웃 처리**
- 다른 API가 401을 반환하면 → 이 엔드포인트로 refresh 시도 → 성공 시 원본 요청 재시도

---

### 3.3 로그아웃

| 항목 | 값 |
|------|-----|
| Method | `POST` |
| Path | `/api/auth/logout` |
| Content-Type | `application/json` |
| Authorization | `Bearer <accessToken>` (선택, 있으면 전송) |

**Request Body**
```json
{
  "refreshToken": "서버_JWT_refresh_token"
}
```

**Response (200 OK)**
```json
{}
```
또는 상태 코드만 반환해도 됨.

**프론트 동작**
- 로그아웃 시점에 refreshToken으로 서버에 폐기 요청
- 서버 응답 실패해도 로컬 세션은 정리

---

## 4. 인증이 필요한 API

- 모든 비인증 API 외의 요청에는 `Authorization: Bearer <accessToken>` 헤더를 붙여 전송
- 프론트는 토큰이 있으면 자동으로 모든 요청에 헤더 주입

---

## 5. 에러 응답

| 상태 코드 | 의미 | 프론트 동작 |
|-----------|------|-------------|
| 401 | access 토큰 만료/무효 | refresh 시도 → 성공 시 재시도, 실패 시 로그아웃 |
| 401 (POST /api/auth/refresh) | refresh 토큰 만료/무효 | 즉시 로그아웃 |
| 4xx / 5xx | 기타 에러 | 에러 그대로 전달 |

---

## 6. 환경 설정

| 항목 | 값 |
|------|-----|
| Base URL | `.env`의 `EXPO_PUBLIC_API_URL` (예: `http://localhost:8080`) |
| Timeout | `EXPO_PUBLIC_API_TIMEOUT_MS` (기본 10000ms) |

---

## 7. 정리

백엔드에서 구현해야 할 API는 다음과 같습니다.

1. **POST /api/auth/kakao/mobile** – 카카오 토큰 검증 후 JWT 발급
2. **POST /api/auth/refresh** – refresh 토큰으로 새 access/refresh 발급
3. **POST /api/auth/logout** – refresh 토큰 폐기

추가 API는 `Authorization: Bearer <accessToken>` 형식의 헤더를 받아 검증하면 됩니다.
