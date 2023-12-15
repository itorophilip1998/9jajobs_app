import { View, Image } from "react-native";
import React from "react";
import SmallText from "./smallText";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import moment from "moment";

export const UserChat = ({ data }: { data: any }) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full items-end">
      <View
        style={{ backgroundColor: darkMode ? "#023215" : "white" }}
        className="w-auto max-w-[250px] bg-[#023215] py-2 rounded-lg"
      >
        {data?.photo?.map((item: any, idx: number) => (
          <Image
            key={idx}
            source={{ uri: item }}
            className="w-[230px] mx-[10px] h-[300px] mb-2 rounded-lg"
            resizeMode="cover"
          />
        ))}

        <SmallText
          style={{ color: darkMode ? "white" : "#0f0f0f" }}
          className="text-white text-left p-0 px-2"
        >
          {data.message}
        </SmallText>
      </View>
      <SmallText className="text-[#626262] p-0 text-[14px]">
        {moment(data.created_at).format("hh:mm A")}
      </SmallText>
    </View>
  );
};

export const FreelancerChat = ({ data }: { data: any }) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full items-start">
      <View
        style={{
          backgroundColor: darkMode ? "#1E1E1E" : "#C4C4C4",
          borderWidth: darkMode ? 0 : 1,
          borderColor: "#A099A8",
        }}
        className="w-auto max-w-[250px] bg-[#1E1E1E] py-2  rounded-lg"
      >
        {data?.photo?.map((item: any, idx: number) => (
          <Image
            key={idx}
            source={{ uri: item }}
            className="w-[230px] mx-[10px] h-[300px] mb-2 rounded-lg"
            resizeMode="cover"
          />
        ))}
        <SmallText
          style={{ color: darkMode ? "white" : "#0f0f0f" }}
          className="text-white text-left p-0 px-2"
        >
          {data.message || "Photo"}
        </SmallText>
      </View>
      <SmallText className="text-[#626262] p-0 text-[14px]">
        {moment(data.created_at).format("hh:mm A")}
      </SmallText>
    </View>
  );
};
