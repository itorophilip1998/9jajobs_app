import { View, Image } from "react-native";
import React from "react";
import { FirstLetterUppercase } from "../utility/helpers";
import SmallText from "./smallText";
import { COLORS } from "../utility/colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import userImg from "../../assets/images/user.jpg";
import moment from "moment";

const ReviewCard = ({ item }: { item: any }) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={
              item?.user?.photo
                ? {
                    uri: item?.user?.photo,
                  }
                : userImg
            }
            alt=""
            className="w-[50px] h-[50px] rounded-full mr-3"
          />
          <View className="pr-2">
            <SmallText
              numberOfLine={1}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] w-[95%] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
            >
              {FirstLetterUppercase(item?.user?.name || "")}
            </SmallText>
            <View className="flex-row items-center">
              <AntDesign name="star" size={15} color={COLORS.primary} />
              <SmallText className="text-primary p-0 text-[13px] pl-1">
                {item?.rating}
              </SmallText>
            </View>
          </View>
        </View>
        <SmallText className="text-[#696969] text-left p-0 text-[15px] pr-2 font-RedHatDisplaySemiBold">
          {moment(item?.created_at).format("DD/MM/YYYY")}
        </SmallText>
        {/* <Feather name="more-vertical" size={24} color={COLORS.primary} /> */}
      </View>
      {item?.review && (
        <SmallText
          style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
          className="text-[#696969] text-left p-0 text-[16px] pt-2 font-RedHatDisplayRegular"
        >
          {item?.review?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}
        </SmallText>
      )}
    </View>
  );
};

export default ReviewCard;
