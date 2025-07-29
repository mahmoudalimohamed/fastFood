import { useCartStore } from "@/store/cart.store";
import { Image, Platform, Text, TouchableOpacity } from "react-native";
import { appWriteConfig } from "../lib/appWrite";

const MenuCard = ({ item: { $id, image_url, name, price } }) => {
  const imageUrl = `${image_url}?project=${appWriteConfig.projectId}`;
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">{price}</Text>
      <TouchableOpacity
        onPress={() =>
          addItem({
            id: $id,
            name,
            price,
            image_url: imageUrl,
            customizations: [],
          })
        }
      >
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
