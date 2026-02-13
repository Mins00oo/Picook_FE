import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";

export default function IngredientCategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item;
          return (
            <TouchableOpacity
              style={[styles.categoryTab, isSelected && styles.categoryTabSelected]}
              onPress={() => onSelectCategory(item)}
            >
              <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.tabListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F6",
  },
  tabListContent: { paddingHorizontal: 20 },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E8EB",
  },
  categoryTabSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: { fontSize: 14, color: colors.textSub, fontWeight: "500" },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },
});
