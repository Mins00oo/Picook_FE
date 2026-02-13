import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";

export default function IngredientActionBar({ selectedCount, onPress }) {
  const isDisabled = selectedCount === 0;

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[styles.actionButton, isDisabled && styles.actionButtonDisabled]}
        disabled={isDisabled}
        onPress={onPress}
      >
        <Text style={styles.actionButtonText}>
          {isDisabled
            ? "재료를 선택해주세요"
            : `${selectedCount}개 재료로 레시피 찾기`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F2F4F6",
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  actionButtonDisabled: { backgroundColor: "#D1D6DB", shadowOpacity: 0 },
  actionButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});
