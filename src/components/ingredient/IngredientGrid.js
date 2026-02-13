import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

export default function IngredientGrid({
  ingredients,
  selectedIngredients,
  onToggleIngredient,
}) {
  const renderIngredientItem = ({ item }) => {
    const isSelected = selectedIngredients.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.ingredientChip, isSelected && styles.ingredientChipSelected]}
        onPress={() => onToggleIngredient(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.ingredientIcon}>{item.icon}</Text>
        <Text style={[styles.ingredientName, isSelected && styles.ingredientNameSelected]}>
          {item.name}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={colors.primary}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderIngredientItem}
      numColumns={3}
      columnWrapperStyle={styles.gridRow}
      contentContainerStyle={styles.gridContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>검색 결과가 없어요 🥲</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  gridContent: { padding: 20, paddingBottom: 100 },
  gridRow: { justifyContent: "space-between", marginBottom: 16 },
  ingredientChip: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  ingredientChipSelected: {
    borderColor: colors.primary,
    backgroundColor: "#F0FDF4",
  },
  ingredientIcon: { fontSize: 32, marginBottom: 8 },
  ingredientName: { fontSize: 14, color: colors.textMain, fontWeight: "500" },
  ingredientNameSelected: { color: colors.primary, fontWeight: "bold" },
  checkIcon: { position: "absolute", top: 8, right: 8 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { color: colors.textSub, fontSize: 16 },
});
