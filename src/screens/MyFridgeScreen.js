import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { INGREDIENTS, INGREDIENT_CATEGORIES } from "../mock/_data";
import { useIngredientStore } from "../store/useIngredientStore";

export default function MyFridgeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const [draftIngredients, setDraftIngredients] = useState([]);

  // 스토어에서 '내 냉장고' 상태 가져오기
  const {
    myFridgeIngredients,
    setMyFridgeIngredients,
    loadFridgeToSelection,
  } = useIngredientStore();

  useEffect(() => {
    setDraftIngredients(myFridgeIngredients);
  }, [myFridgeIngredients]);

  const filteredIngredients = useMemo(() => {
    const normalizedSearchText = searchText.trim();
    return INGREDIENTS.filter((item) => {
      const matchCategory =
        selectedCategory === "전체" || item.category === selectedCategory;
      const matchSearch = item.name.includes(normalizedSearchText);
      return matchCategory && matchSearch;
    });
  }, [searchText, selectedCategory]);

  const toggleDraftIngredient = (id) => {
    setDraftIngredients((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    setMyFridgeIngredients(draftIngredients);
    loadFridgeToSelection();
    Alert.alert("저장 완료", "냉장고 재료가 업데이트 되었습니다!");
  };

  const renderIngredientItem = ({ item }) => {
    const isSaved = draftIngredients.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.ingredientChip, isSaved && styles.ingredientChipSaved]}
        onPress={() => toggleDraftIngredient(item.id)}
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
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 냉장고 채우기</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>완료</Text>
        </TouchableOpacity>
      </View>

      {/* 안내 문구 */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 자주 쓰는 재료를 미리 등록해두세요.{"\n"}
          레시피 검색 시 자동으로 선택됩니다.
        </Text>
      </View>

      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSub} />
          <TextInput
            style={styles.searchInput}
            placeholder="재료 검색"
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: colors.textMain },
  saveText: { fontSize: 16, fontWeight: "bold", color: colors.primary },

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
