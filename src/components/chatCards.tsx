import { View, Text } from "react-native";
import React from "react";
import SmallText from "./smallText";

export const UserChat = ({ message }: { message: string }) => {
  return (
    <View className="w-full items-end">
      <View className="w-auto max-w-[250px] bg-[#023215] py-2 px-3 rounded-lg">
        <SmallText className="text-white text-left p-0">{message}</SmallText>
      </View>
      <SmallText className="text-[#626262] p-0 text-[14px]">08:10 AM</SmallText>
    </View>
  );
};

export const FreelancerChat = ({ message }: { message: string }) => {
  return (
    <View className="w-full items-start">
      <View className="w-auto max-w-[250px] bg-[#1E1E1E] py-2 px-3 rounded-lg">
        <SmallText className="text-white text-left p-0">{message}</SmallText>
      </View>
      <SmallText className="text-[#626262] p-0 text-[14px]">08:10 AM</SmallText>
    </View>
  );
};
