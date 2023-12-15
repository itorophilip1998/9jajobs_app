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
import userImg from "../../assets/images/user.jpg";

const NearUserCard = ({ item }: { item: any }) => {
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
          {item.is_featured === "Yes" && "sponsored"}
        </SmallText>
        <Spacer axis="vertical" value={H(0.5)} />
      </>
      <Image
        source={
          item?.listing_featured_photo &&
          item?.listing_featured_photo.length > 0
            ? {
                uri: item?.listing_featured_photo,
              }
            : userImg
        }
        alt=""
        className="w-full h-[130px] rounded-md mb-2 object-cover"
      />
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row items-center w-[77%]">
          <SmallText
            numberOfLine={1}
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 max-w-[90%]"
          >
            {FirstLetterUppercase(item.listing_name || "")}
          </SmallText>
          {item?.verified && item?.verified?.status === "completed" && (
            <MaterialIcons name="verified" size={18} color={COLORS.primary} />
          )}
        </View>
        <View className="flex-row items-center justify-end w-[23%]">
          <AntDesign name="star" size={15} color={COLORS.primary} />
          <SmallText className="text-primary p-0 text-[13px] pl-1">
            {item.rate_star}
          </SmallText>
        </View>
      </View>
      <Spacer axis="vertical" value={H(0.5)} />
      <View className="w-full flex-row justify-between items-center">
        <SmallText
          numberOfLine={1}
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
          className="text-[#D4E1D2] text-left p-0 text-[13px] w-[45%]"
        >
          {FirstLetterUppercase(
            item?.r_listing_category?.listing_category_name || ""
          )}
        </SmallText>
        <SmallText
          numberOfLine={1}
          style={{ color: darkMode ? "#A099A8" : "#0F0F0F" }}
          className="text-[#A099A8] text-right p-0 text-[13px] w-[50%]"
        >
          {FirstLetterUppercase(item.listing_address || "")}
        </SmallText>
      </View>
      <Spacer axis="vertical" value={H(2)} />
    </View>
  );
};

export default NearUserCard;
