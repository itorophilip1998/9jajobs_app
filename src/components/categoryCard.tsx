import {
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import SmallText from "./smallText";
import { shadowBox } from "../style/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CategoryCard = ({
  item,
  onPress,
  color,
}: {
  item: { title: string; image: string; id: number };
  color: string
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const {darkMode} = useSelector((state: RootState) => state.auth)
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[31%] mb-4 px-2 py-2 bg-[#0F0F0F]  rounded-md"
      style={{
        backgroundColor: color,
        ...shadowBox,
      }}
    >
      <Image
        source={{ uri: item.image }}
        alt=""
        className="w-full h-[70px] rounded-md mb-2"
      />
      <SmallText
        style={{ color: darkMode ? "white" : "#0F0F0F" }}
        className="text-white"
      >
        {item.title}
      </SmallText>
    </TouchableOpacity>
  );
};

export default CategoryCard;
