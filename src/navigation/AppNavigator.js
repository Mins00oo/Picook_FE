import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import MyPageScreen from "../screens/MyPageScreen";

import { useAuthStore } from "../store/useAuthStore";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import IngredientSelectScreen from "../screens/IngredientSelectScreen";
import MyFridgeScreen from "../screens/MyFridgeScreen";
import PopularRecipesScreen from "../screens/PopularRecipesScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSub,
        tabBarIcon: ({ focused, color }) => {
          let iconName = "home";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MyFridge") {
            // [변경] 냉장고/식재료 느낌의 아이콘 (nutrition: 당근 모양)
            iconName = focused ? "nutrition" : "nutrition-outline";
          } else if (route.name === "MyPage") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "홈" }}
      />
      <Tab.Screen
        name="MyFridge"
        component={MyFridgeScreen}
        options={{ title: "내 냉장고" }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ title: "마이" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const user = useAuthStore((state) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="MainTab" component={MainTabs} />
            <Stack.Screen
              name="IngredientSelect"
              component={IngredientSelectScreen}
              options={{
                presentation: "card", // iOS에서 아래에서 위로 올라오는 느낌 (modal)을 원하면 'modal'
                animation: "slide_from_right", // 오른쪽에서 들어오는 애니메이션
              }}
            />
            <Stack.Screen
              name="PopularRecipes"
              component={PopularRecipesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecipeDetail"
              component={RecipeDetailScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
