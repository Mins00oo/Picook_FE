import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useAuthStore } from "../store/useAuthStore"; // 스토어 불러오기

export default function MyPageScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          // 1. 스토어의 user를 null로 만듦
          logout();
          // 2. AppNavigator가 user가 없어진 걸 감지하고 자동으로 로그인 화면으로 보냄!
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <View style={styles.content}>
        {/* 프로필 섹션 */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.textSub} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>{user?.nickname || "사용자"}님</Text>
            <Text style={styles.email}>
              {user?.email || "로그인 정보 없음"}
            </Text>
          </View>
        </View>

        {/* 메뉴 리스트 */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>공지사항</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>앱 버전</Text>
            <Text style={styles.versionText}>v1.0.0</Text>
          </TouchableOpacity>
        </View>

        {/* 로그아웃 버튼 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: colors.textMain },

  content: { flex: 1, padding: 20 },

  // 프로필 카드
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: { flex: 1 },
  nickname: { fontSize: 18, fontWeight: "bold", color: colors.textMain },
  email: { fontSize: 14, color: colors.textSub, marginTop: 4 },

  // 메뉴
  menuContainer: { marginBottom: 30 },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: { fontSize: 16, color: colors.textMain },
  versionText: { fontSize: 14, color: colors.textSub },

  // 로그아웃 버튼
  logoutButton: {
    backgroundColor: "#FFF0F0",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#FF4D4D", fontWeight: "bold", fontSize: 16 },
});
