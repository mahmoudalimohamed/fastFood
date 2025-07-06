import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  return (
    <View className="flex-center">
      <Text className="h3-bold">Sign IN Page</Text>
      <Pressable
        className="custom-btn"
        onPress={() => router.push("/register")}
      >
        <Text className="h3-bold">Sign UP</Text>
      </Pressable>
    </View>
  );
}
