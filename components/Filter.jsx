import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

export default function Filter({ categories }) {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "all");

  const filterData = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  const handlePress = (id) => {
    setActive(id);
    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.$id}
      className={cn(
        `filter`,
        active === item.$id ? "bg-amber-500" : "bg-white"
      )}
      onPress={() => handlePress(item.$id)}
    >
      <Text
        className={cn(
          "body-medium",
          active === item.$id ? "text-white" : "text-dark-100"
        )}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={renderItem}
    />
  );
}
