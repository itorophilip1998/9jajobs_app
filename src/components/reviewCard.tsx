import { View, Image } from "react-native";
import React from "react";
import { FirstLetterUppercase } from "../utility/helpers";
import SmallText from "./smallText";
import { COLORS } from "../utility/colors";
import { Feather } from "@expo/vector-icons";

const ReviewCard = () => {
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
            }}
            alt=""
            className="w-[50px] h-[50px] rounded-full mr-3"
          />
          <SmallText className="text-[#D4E1D2] text-left p-0 text-[19px] pr-2 font-RedHatDisplaySemiBold">
            {FirstLetterUppercase("Faith Abiodon")}
          </SmallText>
        </View>
        <SmallText className="text-[#696969] text-left p-0 text-[15px] pr-2 font-RedHatDisplaySemiBold">
          2/04/2022
        </SmallText>
        <Feather name="more-vertical" size={24} color={COLORS.primary} />
      </View>
      <SmallText className="text-[#696969] text-left p-0 text-[16px] pt-2 font-RedHatDisplaySemiBold">
        Lorem ipsum dolor sit amet consectetur. Dis nullam enim pharetra
        bibendum purus. Blandit faucibus facilisis blandit mauris consectetur
        ultrices in mattis. Aliquet orci morbi sapien elementum. Adipiscing
        proin venenatis morbi nascetur erat praesent fermentum fames. Adipiscing
        etiam netus velit magna magnis ac placerat orci.
      </SmallText>
    </View>
  );
};

export default ReviewCard;
