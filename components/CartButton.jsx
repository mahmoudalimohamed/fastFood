import { images } from "@/constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CartButton() {
  const totlaItems = 10;

  return (
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totlaItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totlaItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
