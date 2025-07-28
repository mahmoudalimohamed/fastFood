import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function SearchBar() {
  const params = useLocalSearchParams();
  const [query, setQuery] = useState(params.query || "");

  const handleSearch = (text) => {
    setQuery(text);
    router.push(`/search?query=${text}`);
  };
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 px-4 py-2 bg-white border border-[#FE8C00] rounded-full shadow-sm"
        value={query}
        onChangeText={handleSearch}
        placeholder="Search..."
        placeholderTextColor="#5D5F6D"
      />
    </View>
  );
}
