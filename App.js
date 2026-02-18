import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    // 1. 안전 영역(노치 등) 처리를 위한 최상위 Provider
    <SafeAreaProvider>
      {/* 2. 상태바(배터리, 시간 나오는 곳) 스타일 설정 */}
      <StatusBar style="auto" />

      {/* 3. 우리가 만든 네비게이션(앱의 본체) 연결 */}
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}
