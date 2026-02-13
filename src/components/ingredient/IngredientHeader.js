import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

export default function IngredientHeader({
  searchText,
  onChangeSearch,
  onPressBack,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>재료 선택</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.textSub} />
        <TextInput
          style={styles.searchInput}
          placeholder="어떤 재료가 있나요?"
          placeholderTextColor={colors.textSub}
          value={searchText}
          onChangeText={onChangeSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: colors.textMain },
  backButton: { padding: 4 },
  rightPlaceholder: { width: 24 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: colors.textMain },
});
