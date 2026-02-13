import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

export default function CategorySection({ categories }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderColumn}>
        <Text style={styles.sectionTitle}>📂 테마별 레시피</Text>
        <Text style={styles.sectionSubtitle}>
          상황에 딱 맞는 메뉴를 추천해드려요
        </Text>
      </View>

      <View style={styles.gridContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryCard, { backgroundColor: cat.color }]}
            activeOpacity={0.8}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryTitle}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 36 },
  sectionHeaderColumn: { paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: colors.textMain },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSub,
    marginTop: 6,
    fontWeight: "400",
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryCard: {
    width: (width - 48 - 24) / 3,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  categoryIcon: { fontSize: 32, marginBottom: 8 },
  categoryTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMain,
    textAlign: "center",
    lineHeight: 18,
  },
});
