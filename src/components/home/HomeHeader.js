import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

export default function HomeHeader({ nickname }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.greetingText}>
            {nickname || "민수"}님, 오늘 아침은{"\n"}
            <Text style={styles.highlightText}>든든한 계란말이</Text> 어때요?
          </Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.white}
          />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingText: {
    fontSize: 22,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 34,
    fontWeight: "400",
  },
  highlightText: { fontWeight: "700", color: "#ffffff" },
  notifButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    marginTop: 4,
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#FF5252",
  },
});
