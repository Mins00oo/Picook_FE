import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { INGREDIENTS, INGREDIENT_CATEGORIES } from "../mock/_data";
import { useIngredientStore } from "../store/useIngredientStore";
import IngredientHeader from "../components/ingredient/IngredientHeader";
import IngredientCategoryTabs from "../components/ingredient/IngredientCategoryTabs";
import IngredientGrid from "../components/ingredient/IngredientGrid";
import IngredientActionBar from "../components/ingredient/IngredientActionBar";

export default function IngredientSelectScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchText, setSearchText] = useState("");

  // Zustand 상태
  const { selectedIngredients, toggleIngredient, loadFridgeToSelection } =
    useIngredientStore();

  useFocusEffect(
    React.useCallback(() => {
      loadFridgeToSelection();
    }, [loadFridgeToSelection]),
  );

  const filteredIngredients = useMemo(() => {
    const normalizedSearchText = searchText.trim();

    return INGREDIENTS.filter((item) => {
      const matchCategory =
        selectedCategory === "전체" || item.category === selectedCategory;
      const matchSearch = item.name.includes(normalizedSearchText);
      return matchCategory && matchSearch;
    });
  }, [searchText, selectedCategory]);

  // 요리 찾기 버튼 클릭
  const handleSearchRecipes = () => {
    // 다음 화면(검색 결과)으로 이동하며 선택된 재료 전달 (혹은 스토어 사용)
    // navigation.navigate('RecipeResult'); // 아직 안 만듦
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <IngredientHeader
        searchText={searchText}
        onChangeSearch={setSearchText}
        onPressBack={() => navigation.goBack()}
      />
      <IngredientCategoryTabs
        categories={INGREDIENT_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <IngredientGrid
        ingredients={filteredIngredients}
        selectedIngredients={selectedIngredients}
        onToggleIngredient={toggleIngredient}
      />
      <IngredientActionBar
        selectedCount={selectedIngredients.length}
        onPress={handleSearchRecipes}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
