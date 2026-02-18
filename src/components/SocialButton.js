import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 (필요시 사용)

export default function SocialButton({
  title,
  backgroundColor,
  textColor,
  iconName,
  onPress,
  hasBorder,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        hasBorder && styles.border, // 테두리가 필요한 경우(구글 등)
      ]}
      onPress={onPress}
      activeOpacity={0.8} // 클릭 시 투명도 효과
    >
      {/* 아이콘이 있다면 여기에 배치 */}
      {iconName && (
        <Ionicons
          name={iconName}
          size={20}
          color={textColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  border: {
    borderWidth: 1,
    borderColor: "#E5E8EB",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 8,
  },
});
