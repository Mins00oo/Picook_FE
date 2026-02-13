// 나중에 백엔드 API에서 받아올 데이터 구조를 미리 정의함
export const POPULAR_RECIPES = [
  {
    id: 1,
    title: "매운 갈비찜",
    time: "40분",
    difficulty: "중",
    image:
      "https://images.unsplash.com/photo-1547496502-ffa2264a36b5?w=500&auto=format&fit=crop&q=60", // 임시 무료 이미지
  },
  {
    id: 2,
    title: "닭가슴살 샐러드",
    time: "15분",
    difficulty: "하",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "베이컨 크림 파스타",
    time: "25분",
    difficulty: "중",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "김치볶음밥",
    time: "10분",
    difficulty: "하",
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&auto=format&fit=crop&q=60",
  },
];

export const CATEGORIES = [
  { id: "diet", title: "다이어트", icon: "🥗", color: "#E8F5E9" }, // 연한 초록
  { id: "solo", title: "자취생 간단", icon: "🥗", color: "#FFF3E0" }, // 연한 주황 (aaa는 이모지 대신 텍스트 확인용)
  { id: "health", title: "헬스/고단백", icon: "💪", color: "#E3F2FD" }, // 연한 파랑
  { id: "party", title: "집들이 요리", icon: "🎉", color: "#F3E5F5" }, // 연한 보라
  { id: "hangover", title: "해장 요리", icon: "🍜", color: "#FFEBEE" }, // 연한 빨강
  { id: "snack", title: "야식/안주", icon: "🍺", color: "#E0F7FA" }, // 연한 하늘
];

// [신규 추가] 식재료 카테고리 및 데이터
export const INGREDIENT_CATEGORIES = [
  "전체",
  "채소",
  "고기/계란",
  "해산물",
  "유제품",
  "소스/기타",
];

export const INGREDIENTS = [
  { id: 101, name: "계란", category: "고기/계란", icon: "🥚" },
  { id: 102, name: "두부", category: "채소", icon: "🧊" }, // 두부 아이콘 대체
  { id: 103, name: "대파", category: "채소", icon: "🧅" },
  { id: 104, name: "양파", category: "채소", icon: "🧅" },
  { id: 105, name: "돼지고기", category: "고기/계란", icon: "🥓" },
  { id: 106, name: "김치", category: "채소", icon: "🥬" },
  { id: 107, name: "스팸", category: "고기/계란", icon: "🍖" },
  { id: 108, name: "감자", category: "채소", icon: "🥔" },
  { id: 109, name: "마늘", category: "채소", icon: "🧄" },
  { id: 110, name: "우유", category: "유제품", icon: "🥛" },
  { id: 111, name: "치즈", category: "유제품", icon: "🧀" },
  { id: 112, name: "새우", category: "해산물", icon: "🍤" },
  { id: 113, name: "고추장", category: "소스/기타", icon: "🌶️" },
  { id: 114, name: "간장", category: "소스/기타", icon: "🏺" },
];
