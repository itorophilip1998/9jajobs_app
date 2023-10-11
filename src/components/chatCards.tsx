import { View, Text } from "react-native";
import React from "react";
import SmallText from "./smallText";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const UserChat = ({ message }: { message: string }) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full items-end">
      <View
        style={{ backgroundColor: darkMode ? "#023215" : "white" }}
        className="w-auto max-w-[250px] bg-[#023215] py-2 px-3 rounded-lg"
      >
        <SmallText
          style={{ color: darkMode ? "white" : "#0f0f0f" }}
          className="text-white text-left p-0"
        >
          {message}
        </SmallText>
      </View>
      <SmallText className="text-[#626262] p-0 text-[14px]">08:10 AM</SmallText>
    </View>
  );
};

export const FreelancerChat = ({ message }: { message: string }) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full items-start">
      <View
        style={{
          backgroundColor: darkMode ? "#1E1E1E" : "#C4C4C4",
          borderWidth: darkMode ? 0 : 1,
          borderColor: "#A099A8",
        }}
        className="w-auto max-w-[250px] bg-[#1E1E1E] py-2 px-3 rounded-lg"
      >
        <SmallText
          style={{ color: darkMode ? "white" : "#0f0f0f" }}
          className="text-white text-left p-0"
        >
          {message}
        </SmallText>
      </View>
      <SmallText className="text-[#626262] p-0 text-[14px]">08:10 AM</SmallText>
    </View>
  );
};
