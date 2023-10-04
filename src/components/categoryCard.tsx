import {
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import SmallText from "./smallText";
import { shadowBox } from "../style/Typography";

const CategoryCard = ({
  item,
  onPress,
}: {
  item: { title: string; image: string; id: number };
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[31%] mb-4 px-2 py-2 bg-[#0F0F0F]  rounded-md"
      style={shadowBox}
    >
      <Image
        source={{ uri: item.image }}
        alt=""
        className="w-full h-[70px] rounded-md mb-2"
      />
      <SmallText className="text-white">{item.title}</SmallText>
    </TouchableOpacity>
  );
};

export default CategoryCard;
