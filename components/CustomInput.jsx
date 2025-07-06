import cn from "clsx";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        className={cn(
          "input",
          isFocused ? "border-primary" : "border-gray-300"
        )}
      />
    </View>
  );
}
