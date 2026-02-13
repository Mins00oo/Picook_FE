import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useIngredientStore = create(
  persist(
    (set) => ({
      // 1. 내 냉장고 (영구 저장됨)
      myFridgeIngredients: [],

      // 2. 현재 검색을 위해 선택한 재료 (일회성)
      selectedIngredients: [],

      // [내 냉장고 관리] 넣고 빼기
      toggleMyFridge: (id) =>
        set((state) => {
          const exists = state.myFridgeIngredients.includes(id);
          return {
            myFridgeIngredients: exists
              ? state.myFridgeIngredients.filter((itemId) => itemId !== id)
              : [...state.myFridgeIngredients, id],
          };
        }),

      // [내 냉장고 관리] 완료 버튼에서 한 번에 반영
      setMyFridgeIngredients: (ingredientIds) =>
        set({
          myFridgeIngredients: [...ingredientIds],
        }),

      // [검색용 선택] 넣고 빼기
      toggleIngredient: (id) =>
        set((state) => {
          const exists = state.selectedIngredients.includes(id);
          return {
            selectedIngredients: exists
              ? state.selectedIngredients.filter((itemId) => itemId !== id)
              : [...state.selectedIngredients, id],
          };
        }),

      // [핵심 기능] 검색 화면 들어갈 때: 냉장고 재료를 -> 검색 선택 재료로 복사
      loadFridgeToSelection: () =>
        set((state) => ({
          selectedIngredients: [...state.myFridgeIngredients],
        })),

      // 초기화
      clearSelection: () => set({ selectedIngredients: [] }),
    }),
    {
      name: "ingredient-storage", // AsyncStorage 키 이름
      storage: createJSONStorage(() => AsyncStorage),
      // selectedIngredients는 저장 안 하고 싶으면 partialize 옵션 사용 가능하지만, 일단 다 저장해도 무방
    },
  ),
);
