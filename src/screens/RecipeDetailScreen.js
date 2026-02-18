import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../components/common/EmptyState";
import { POPULAR_RECIPES } from "../mock/_data";
import { colors } from "../theme/colors";

export default function RecipeDetailScreen({ route, navigation }) {
  const recipeId = route?.params?.recipeId;
  const recipe = POPULAR_RECIPES.find((item) => item.id === recipeId);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          icon="restaurant-outline"
          title="레시피 정보를 찾을 수 없어요"
          description="목록에서 다시 선택해주세요."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>레시피</Text>
          <View style={styles.rightPlaceholder} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={16} color={colors.textSub} />
            <Text style={styles.metaText}>예상 소요시간 {recipe.time}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="barbell-outline" size={16} color={colors.textSub} />
            <Text style={styles.metaText}>난이도 {recipe.difficulty}</Text>
          </View>

          <View style={styles.noticeBox}>
            <Text style={styles.noticeTitle}>레시피 상세</Text>
            <Text style={styles.noticeText}>
              다음 단계에서 조리 순서/재료/팁을 연결할 예정입니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F6",
    backgroundColor: colors.background,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: colors.textMain },
  rightPlaceholder: { width: 24 },
  heroImage: { width: "100%", height: 250, backgroundColor: "#ECEFF1" },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  title: {
    fontSize: 26,
    color: colors.textMain,
    fontWeight: "700",
    marginBottom: 14,
  },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  metaText: { marginLeft: 8, color: colors.textSub, fontSize: 15 },
  noticeBox: {
    marginTop: 20,
    backgroundColor: "#F6F8FA",
    borderRadius: 12,
    padding: 14,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 6,
  },
  noticeText: { fontSize: 14, lineHeight: 20, color: colors.textSub },
});
