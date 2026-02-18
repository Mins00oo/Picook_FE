import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import Skeleton from "../common/Skeleton";

export default function PopularSection({
  recipes,
  isLoading = false,
  onPressMore,
  onPressRecipe,
}) {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPressRecipe?.(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{index + 1}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.cardMeta}>
          <Ionicons name="time-outline" size={14} color={colors.textSub} />
          <Text style={styles.metaText}>{item.time}</Text>
          <Text style={styles.metaDivider}>|</Text>
          <Text style={styles.metaText}>난이도 {item.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔥 이달의 인기 요리</Text>
        <TouchableOpacity onPress={onPressMore}>
          <Text style={styles.moreText}>전체보기</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={isLoading ? [{ id: "skeleton-1" }, { id: "skeleton-2" }] : recipes}
        renderItem={
          isLoading
            ? () => (
                <View style={styles.skeletonCard}>
                  <Skeleton width="100%" height={120} style={styles.skeletonImage} />
                  <View style={styles.skeletonTextBox}>
                    <Skeleton width="75%" height={16} />
                    <Skeleton width="50%" height={12} style={{ marginTop: 10 }} />
                  </View>
                </View>
              )
            : renderItem
        }
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 36 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: colors.textMain },
  moreText: { fontSize: 13, color: colors.textSub, fontWeight: "500" },
  horizontalListPadding: { paddingHorizontal: 24 },
  skeletonCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  skeletonImage: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  skeletonTextBox: { padding: 16 },

  // Card Styles
  card: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: { position: "relative" },
  cardImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#F0F0F0",
  },
  rankBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rankText: { color: "white", fontWeight: "bold", fontSize: 14 },
  cardContent: { padding: 16 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 8,
  },
  cardMeta: { flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 12, color: colors.textSub },
  metaDivider: { fontSize: 10, color: "#E0E0E0", marginHorizontal: 8 },
});
