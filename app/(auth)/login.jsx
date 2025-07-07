import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import * as Sentry from "@sentry/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { signIn } from "../../lib/appWrite";
import useAuthStore from "../../store/auth.store";

export default function Login() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const fetchAuthenticatedUser = useAuthStore(
    (state) => state.fetchAuthenticatedUser
  );

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert("Please enter valid email & password..");
      return;
    }
    setIsSubmit(true);
    try {
      //call appwrite
      await signIn({ email, password });
      await fetchAuthenticatedUser();
      router.replace("/");
    } catch (error) {
      Sentry.captureEvent(error);
      Alert.alert(error.message);
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <View className="gap-8 bg-white rounded-lg p-5 mt-0">
      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="password"
        keyboardType="default"
        secureTextEntry={true}
      />

      <CustomButton
        title="Sign In"
        isLoading={isSubmit}
        onPress={handleSubmit}
      />

      <View className="flex-1 justify-center mt-  gap-2 ">
        <Text className="base-regular text-gray-100 text-center ">
          Don't Have Account ?
        </Text>
        <CustomButton
          title="Sign Up"
          onPress={() => router.push("/register")}
        />
      </View>
    </View>
  );
}
