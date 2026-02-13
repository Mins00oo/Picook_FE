import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { POPULAR_RECIPES, CATEGORIES } from "../mock/_data";
import { useAuthStore } from "../store/useAuthStore";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);

  // [컴포넌트] 인기 요리 카드
  const renderPopularItem = ({ item, index }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        {/* 순위 배지 */}
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
    <View style={styles.container}>
      {/* 1. 헤더 (AI 추천 컨셉 강화) */}
      <View style={styles.headerContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerContent}>
            <View>
              {/* 날짜나 상황 멘트 (작게) */}
              {/* 메인 추천 멘트 (크게) */}
              <Text style={styles.greetingText}>
                {user?.nickname || "민수"}님, 오늘 아침은{"\n"}
                <Text style={styles.highlightText}>든든한 계란말이</Text>{" "}
                어때요?
              </Text>
            </View>

            {/* 알림 아이콘 */}
            <TouchableOpacity style={styles.notifButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colors.white}
              />
              <View style={styles.badge} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. 섹션 1: 이달의 인기 요리 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 이달의 인기 요리</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>전체보기</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={POPULAR_RECIPES}
            renderItem={renderPopularItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListPadding}
          />
        </View>

        {/* 3. 섹션 2: 테마별 레시피 (패딩 수정 및 텍스트 겹침 해결) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderColumn}>
            <Text style={styles.sectionTitle}>📂 테마별 레시피</Text>
            <Text style={styles.sectionSubtitle}>
              상황에 딱 맞는 메뉴를 추천해드려요
            </Text>
          </View>

          <View style={styles.gridContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, { backgroundColor: cat.color }]}
                activeOpacity={0.8}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 하단 여백 */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* 4. FAB (위치 조정) */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="search" size={20} color="white" />
        <Text style={styles.fabText}>재료 선택하러 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // [Header] 배경색과 텍스트 스타일 수정
  headerContainer: {
    backgroundColor: colors.primary,
    paddingBottom: 24, // 헤더 아래 여백 확보
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: 24, // 전체 좌우 패딩 20 -> 24로 통일감
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingText: {
    fontSize: 22,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 34, // 줄간격 넉넉하게
    fontWeight: "400",
  },
  highlightText: {
    fontWeight: "700",
    color: "#ffffff", // 강조 텍스트 완전 흰색
  },
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

  // [Common Section]
  scrollContent: { paddingTop: 30 },
  section: { marginBottom: 36 }, // 섹션 간 간격 넓힘

  // 섹션 헤더 (Row 타입 - 인기요리)
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24, // 헤더와 동일한 패딩
    marginBottom: 16,
  },
  // 섹션 헤더 (Column 타입 - 테마)
  sectionHeaderColumn: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20, // 폰트 사이즈 키움 (가독성)
    fontWeight: "700",
    color: colors.textMain,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSub,
    marginTop: 6, // [수정] 제목과 설명 사이 간격 추가 (겹침 해결)
    fontWeight: "400",
  },
  moreText: { fontSize: 13, color: colors.textSub, fontWeight: "500" },

  // [Popular Card]
  horizontalListPadding: { paddingHorizontal: 24 }, // 리스트 시작점도 24로 통일
  card: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // 그림자 방향 아래로
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10, // 그림자 잘림 방지
  },
  imageContainer: { position: "relative" },
  cardImage: {
    width: "100%",
    height: 140, // 이미지 높이 키움
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

  // [Category Grid] - 정렬 문제 해결
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryCard: {
    width: (width - 48 - 24) / 3,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 4, // 텍스트가 모서리에 붙지 않도록 내부 패딩 추가
  },
  categoryIcon: { fontSize: 32, marginBottom: 8 },
  categoryTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMain,
    textAlign: "center", // [핵심] 줄바꿈 시에도 텍스트 중앙 정렬 유지
    lineHeight: 18, // 줄간격 조절로 가독성 확보
  },

  // [FAB] - 스타일 개선
  fab: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 100,
    // 그림자를 더 부드럽고 진하게
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
});
