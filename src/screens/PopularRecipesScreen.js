import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { POPULAR_RECIPES } from "../mock/_data";
import { colors } from "../theme/colors";

const TOP_RECIPE_LIMIT = 10;

export default function PopularRecipesScreen({ navigation }) {
  const topRecipes = POPULAR_RECIPES.slice(0, TOP_RECIPE_LIMIT);

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
          <Text style={styles.headerTitle}>인기 요리 TOP 10</Text>
          <View style={styles.rightPlaceholder} />
        </View>
      </View>
      <FlatList
        data={topRecipes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>TOP {index + 1}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={14} color={colors.textSub} />
                <Text style={styles.metaText}>{item.time}</Text>
                <Text style={styles.metaDivider}>|</Text>
                <Text style={styles.metaText}>난이도 {item.difficulty}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
  listContent: { padding: 20, paddingBottom: 28, paddingTop: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: "100%", height: 170, backgroundColor: "#F0F0F0" },
  rankBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  rankText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  content: { padding: 14 },
  title: { fontSize: 18, fontWeight: "700", color: colors.textMain, marginBottom: 8 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 13, color: colors.textSub },
  metaDivider: { marginHorizontal: 8, color: "#CDD3D8", fontSize: 11 },
});
