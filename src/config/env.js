import Constants from "expo-constants";

/**
 * Environment variables (.env / EAS env)
 * In dev builds, replace localhost with dev machine host when available.
 */
const RAW_API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || "").trim();
const RAW_TIMEOUT = Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS);

const getDevHost = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    "";
  return hostUri.split(":")[0] || "";
};

const resolveApiBaseUrl = () => {
  if (!RAW_API_BASE_URL) return "";

  const isLoopback =
    RAW_API_BASE_URL.includes("://localhost") ||
    RAW_API_BASE_URL.includes("://127.0.0.1");

  if (!__DEV__ || !isLoopback) {
    return RAW_API_BASE_URL;
  }

  const devHost = getDevHost();
  if (!devHost) {
    return RAW_API_BASE_URL;
  }

  return RAW_API_BASE_URL.replace("://localhost", `://${devHost}`).replace(
    "://127.0.0.1",
    `://${devHost}`,
  );
};

export const API_BASE_URL = resolveApiBaseUrl();
export const API_TIMEOUT_MS =
  Number.isFinite(RAW_TIMEOUT) && RAW_TIMEOUT > 0 ? RAW_TIMEOUT : 10000;
