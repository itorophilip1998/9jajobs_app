import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import SmallText from "./smallText";
import Spacer from "./spacer";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FirstLetterUppercase } from "../utility/helpers";
import { COLORS } from "../utility/colors";
import { shadowBox } from "../style/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const NearUserCard = ({
  item,
}: {
  item: {
    id: number;
    image: string;
    verified: boolean;
    rating: number;
    location: string;
    name: string;
    career: string;
    sponsored: boolean;
  };
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View
      style={{ backgroundColor: darkMode ? "#0F0F0F" : "white", ...shadowBox }}
      className="w-full h-full px-3 bg-[#0F0F0F]  rounded-lg"
    >
      <>
        <Spacer axis="vertical" value={H(0.5)} />
        <SmallText
          style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
          className="text-left text-[#696969] text-[13px] p-0"
        >
          {item.sponsored && "sponsored"}
        </SmallText>
        <Spacer axis="vertical" value={H(0.5)} />
      </>
      <Image
        source={{ uri: item.image }}
        alt=""
        className="w-full h-[130px] rounded-md mb-2"
      />
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row items-center">
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2"
          >
            {FirstLetterUppercase(item.name || "")}
          </SmallText>
          {item.verified && (
            <MaterialIcons name="verified" size={18} color={COLORS.primary} />
          )}
        </View>
        <View className="flex-row items-center">
          <AntDesign name="star" size={15} color={COLORS.primary} />
          <SmallText className="text-primary p-0 text-[13px] pl-1">
            {item.rating}
          </SmallText>
        </View>
      </View>
      <Spacer axis="vertical" value={H(0.5)} />
      <View className="w-full flex-row justify-between items-center">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
          className="text-[#D4E1D2] text-left p-0 text-[13px] w-[50%]"
        >
          {FirstLetterUppercase(item.career || "")}
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#A099A8" : "#0F0F0F" }}
          className="text-[#A099A8] text-right p-0 text-[13px] w-[40%]"
        >
          {FirstLetterUppercase(item.location || "")}
        </SmallText>
      </View>
      <Spacer axis="vertical" value={H(2)} />
    </View>
  );
};

export default NearUserCard;