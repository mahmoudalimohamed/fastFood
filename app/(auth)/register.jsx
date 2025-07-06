import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Register() {
  return (
    <View className="flex-center">
      <Text className="h3-bold">Sign UP Page</Text>
      <Pressable className="custom-btn" onPress={() => router.push("/login")}>
        <Text className="h3-bold">Sign IN </Text>
      </Pressable>
    </View>
  );
}
