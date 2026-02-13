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
