import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import useAuthStore from "../../store/auth.store";

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Redirect href={"/login"} />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FE8C00", // primary color
        tabBarInactiveTintColor: "#5D5F6D", // gray color
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5, // for Android shadow
          shadowColor: "#1a1a1a", // for iOS shadow
          shadowOffset: { width: 0, height: 2 }, // for iOS shadow
          shadowOpacity: 0.1, // for iOS shadow
          shadowRadius: 4, // for iOS shadow
          height: 60,
          borderRadius: 25,
          marginHorizontal: 5,
          paddingHorizontal: 10,
          marginVertical: 0,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
