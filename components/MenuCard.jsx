import { Image, Platform, Text, TouchableOpacity } from "react-native";
import { appWriteConfig } from "../lib/appWrite";

export default function MenuCart({ item }) {
  const { image_url, name, price } = item;
  const imageUrl = `${image_url}?project=${appWriteConfig.projectId}`;
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787", shadowOpacity: 0.2 }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10 mt-2"
        resizeMode="contain"
      />
      <Text className="font-semibold text-dark-100 text-center mb-2">
        {name}
      </Text>
      <Text className="font-semibold text-primary text-xl mb-2">
        ${price.toFixed(2)}
      </Text>
      <TouchableOpacity
        className="bg-primary rounded-full px-4 py-2"
        onPress={() => {}}
      >
        <Text className="paragraph-bold text-white">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
