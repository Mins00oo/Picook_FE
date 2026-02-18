import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialButton from "../components/SocialButton";
import { useAuthStore } from "../store/useAuthStore";
import { colors } from "../theme/colors";

export default function LoginScreen() {
  // 스토어에서 로그인 함수와 로딩 상태 가져오기
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleLogin = async (provider) => {
    // 실제 로그인 로직 실행 (상태가 변하면 AppNavigator가 알아서 화면 전환)
    await login(provider);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 로고 영역 */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>👨‍🍳</Text>
          <Text style={styles.logoText}>Picook</Text>
          <Text style={styles.slogan}>
            냉장고 속 재료로 완성하는 오늘의 식탁
          </Text>
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <SocialButton
            title="카카오로 시작하기"
            backgroundColor={colors.kakao}
            textColor={colors.kakaoText}
            iconName="chatbubble"
            onPress={() => handleLogin("Kakao")}
          />
          <SocialButton
            title="네이버로 시작하기"
            backgroundColor={colors.naver}
            textColor={colors.naverText}
            iconName="search"
            onPress={() => handleLogin("Naver")}
          />
          <SocialButton
            title="구글로 시작하기"
            backgroundColor={colors.google}
            textColor={colors.googleText}
            hasBorder={true}
            iconName="logo-google"
            onPress={() => handleLogin("Google")}
          />

          <Text style={styles.helpText}>도움이 필요하신가요?</Text>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingVertical: 40,
  },

  logoContainer: { alignItems: "center", marginTop: 100 },
  logoEmoji: { fontSize: 60, marginBottom: 10 },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  slogan: { fontSize: 16, color: colors.textSub },

  buttonContainer: { width: "100%", alignItems: "center" },
  helpText: {
    marginTop: 20,
    color: colors.textSub,
    fontSize: 13,
    textDecorationLine: "underline",
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
