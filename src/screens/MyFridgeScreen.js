import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { colors } from "../theme/colors";
import { INGREDIENTS, INGREDIENT_CATEGORIES } from "../mock/_data";
import { useIngredientStore } from "../store/useIngredientStore";
import { useDebounce } from "../hooks/useDebounce";
import EmptyState from "../components/common/EmptyState";

export default function MyFridgeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  // 스토어에서 필요한 상태/액션만 선택 구독
  const myFridgeIngredients = useIngredientStore(
    (state) => state.myFridgeIngredients,
  );
  const toggleMyFridge = useIngredientStore((state) => state.toggleMyFridge);
  const loadFridgeToSelection = useIngredientStore(
    (state) => state.loadFridgeToSelection,
  );

  const filteredIngredients = useMemo(() => {
    const normalizedSearchText = debouncedSearchText.trim();
    return INGREDIENTS.filter((item) => {
      const matchCategory =
        selectedCategory === "전체" || item.category === selectedCategory;
      const matchSearch = item.name.includes(normalizedSearchText);
      return matchCategory && matchSearch;
    });
  }, [debouncedSearchText, selectedCategory]);

  const toggleIngredientInFridge = (id) => {
    const exists = myFridgeIngredients.includes(id);
    const ingredientName =
      INGREDIENTS.find((ingredient) => ingredient.id === id)?.name ?? "재료";

    toggleMyFridge(id);
    loadFridgeToSelection();

    Toast.show({
      type: "success",
      text1: exists
        ? `${ingredientName}을(를) 냉장고에서 제거했어요`
        : `${ingredientName}을(를) 냉장고에 추가했어요`,
      position: "top",
      topOffset: 70,
      visibilityTime: 1200,
    });
  };

  const renderIngredientItem = ({ item }) => {
    const isSaved = myFridgeIngredients.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.ingredientChip, isSaved && styles.ingredientChipSaved]}
        onPress={() => toggleIngredientInFridge(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.ingredientIcon}>{item.icon}</Text>
        <Text
          style={[styles.ingredientName, isSaved && styles.ingredientNameSaved]}
        >
          {item.name}
        </Text>
        {isSaved && (
          <View style={styles.savedBadge}>
            <Ionicons name="checkmark" size={12} color="white" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 안내 문구 */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          자주 쓰는 재료를 등록해두세요.{"\n"}
          레시피 검색 시 자동으로 포함됩니다.
        </Text>
      </View>

      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSub} />
          <TextInput
            style={styles.searchInput}
            placeholder="검색"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* 카테고리 & 리스트 */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={INGREDIENT_CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory === item && styles.categoryTabSelected,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>

      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderIngredientItem}
        numColumns={3}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="ice-cream-outline"
            title="해당 조건의 재료가 없어요"
            description="검색어나 카테고리를 변경해보세요."
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  infoBox: {
    backgroundColor: "#F0FDF4",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: { fontSize: 13, color: "#15803d", lineHeight: 20 },

  searchContainer: { paddingHorizontal: 20, marginBottom: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },

  categoryContainer: { paddingBottom: 12 },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E8EB",
  },
  categoryTabSelected: {
    backgroundColor: colors.textMain,
    borderColor: colors.textMain,
  },
  categoryText: { fontSize: 13, color: colors.textSub },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },

  gridContent: { padding: 20 },
  gridRow: { justifyContent: "space-between", marginBottom: 16 },
  ingredientChip: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F2F4F6",
  },
  ingredientChipSaved: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: "#F0FDF4",
  },
  ingredientIcon: { fontSize: 32, marginBottom: 8 },
  ingredientName: { fontSize: 14, color: colors.textMain },
  ingredientNameSaved: { fontWeight: "bold", color: colors.primary },
  savedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
