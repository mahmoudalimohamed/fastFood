import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { createUser } from "../../lib/appWrite";

export default function Register() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      Alert.alert("Please enter valid name & email & password..");
      return;
    }
    setIsSubmit(true);
    try {
      //call appwrite
      await createUser({ email, password, name });
      router.replace("/");
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <View className="gap-8 bg-white rounded-lg p-5 mt-0">
      <CustomInput
        placeholder="Enter your Name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Name"
        keyboardType="default"
      />

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
        title="Sign Up"
        isLoading={isSubmit}
        onPress={handleSubmit}
      />

      <View className="flex-1 justify-center mt-  gap-2 ">
        <Text className="base-regular text-gray-100 text-center ">
          Already Have Account ?
        </Text>
        <CustomButton title="Sign Up" onPress={() => router.push("/login")} />
      </View>
    </View>
  );
}
