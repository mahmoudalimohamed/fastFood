import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function index() {
  const listItemes = ({ item, index }) => {
    const isEven = index % 2 === 0;
    return (
      <Pressable
        className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
        style={{ backgroundColor: item.color }}
        android_ripple={{ color: "#fffff22" }}
      >
        {({ pressed }) => (
          <>
            <View className="h-full w-1/2">
              <Image
                source={item.image}
                className="size-full"
                resizeMode="contain"
              />
            </View>
            <View
              className={cn("offer-card__info", isEven ? "pl-10" : "pr-10")}
            >
              <Text className="h1-bold  text-white leading-tight">
                {item.title}
              </Text>
              <Image
                source={images.arrowRight}
                className="size-10"
                resizeMode="contain"
                tintColor="#ffffff"
              />
            </View>
          </>
        )}
      </Pressable>
    );
  };

  const listHeader = (
    <View className="flex-between flex-row w-full my-5 px-1 ">
      <View className="flex-start">
        <Text className="small-bold text-primary">Deliver To</Text>
        <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
          <Text className="paragraph-bold text-dark-100">Alex</Text>
          <Image
            source={images.arrowDown}
            className="size-3"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <CartButton />
    </View>
  );

  return (
    <FlatList
      data={offers}
      showsVerticalScrollIndicator={false}
      renderItem={listItemes}
      ListHeaderComponent={listHeader}
      contentContainerClassName="p-2 pb-20 bg-white"
    />
  );
}
