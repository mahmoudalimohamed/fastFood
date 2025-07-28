import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartButton from "../../components/CartButton";
import Filter from "../../components/Filter";
import MenuCart from "../../components/MenuCard";
import SearchBar from "../../components/SearchBar";
import { getCategories, getMenu } from "../../lib/appWrite";
import useAppwrite from "../../lib/useAppwrite";
export default function Search() {
  const params = useLocalSearchParams();
  const { category, query } = params;

  // Fetch menu items based on category and query
  const { data, loading, error, refetch } = useAppwrite({
    fn: getMenu,
    params: { categories: category, query },
  });

  useEffect(() => {
    refetch({ categories: category, query });
  }, [category, query]);

  // Fetch categories for filtering options
  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  const ItemList = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
      <View className={cn("flex-1 max-w-[48%]", !isEven ? "mt-10" : "mt-0")}>
        <MenuCart item={item} />
      </View>
    );
  };

  const headerContant = (
    <View className="my-5 gap-5">
      <View className="flex-between flex-row w-full">
        <View className="flex-start">
          <Text className=" text-center text-2xl text-primary">
            find your favorite food
          </Text>
        </View>
        <CartButton />
      </View>
      <SearchBar />
      <Filter categories={categories} />
    </View>
  );

  return (
    <SafeAreaView className=" h-full">
      <FlatList
        data={data}
        renderItem={ItemList}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-5 p-4 pb-20"
        ListHeaderComponent={headerContant}
        ListEmptyComponent={() =>
          !loading && (
            <Text className="text-center text-dark-100">No results found</Text>
          )
        }
      />
    </SafeAreaView>
  );
}
