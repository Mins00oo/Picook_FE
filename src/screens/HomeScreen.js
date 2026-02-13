import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useAuthStore } from "../store/useAuthStore";
import { POPULAR_RECIPES, CATEGORIES } from "../mock/_data";

import HomeHeader from "../components/home/HomeHeader";
import PopularSection from "../components/home/PopularSection";
import CategorySection from "../components/home/CategorySection";

export default function HomeScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      {/* 1. 헤더 (안전 영역 처리는 Header 컴포넌트 안이 아니라 여기서 감싸거나, Header 내부에서 처리 가능. 
          아까 코드상 Header 내부에서 SafeAreaView를 쓰지 않고 View만 썼으므로 여기서 SafeAreaView로 감쌈) */}
      <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.primary }}>
        <HomeHeader nickname={user?.nickname} />
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PopularSection recipes={POPULAR_RECIPES} />
        <CategorySection categories={CATEGORIES} />
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("IngredientSelect")}
        >
          <Ionicons name="search" size={20} color="white" />
          <Text style={styles.fabText}>내 재료로 레시피 찾기</Text>
        </TouchableOpacity>

        <View style={{ height: 0 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingTop: 30 },

  // FAB 스타일만 남음
  fab: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
});
