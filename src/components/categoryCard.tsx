import { View, Text, Image } from "react-native";
import React from "react";
import SmallText from "./smallText";

const CategoryCard = ({item}: {item: { title: string; image: string; id: number }}) => {
  return (
    <View className="w-[31%] mb-4 px-2 py-2 bg-[#1b1b1b]  rounded-md">
      <Image
        source={{ uri: item.image }}
        alt=""
        className="w-full h-[70px] rounded-md mb-2"
      />
      <SmallText className="text-white">{item.title}</SmallText>
    </View>
  );
};

export default CategoryCard;
