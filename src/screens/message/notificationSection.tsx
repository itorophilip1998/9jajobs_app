import { View, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Spacer, SmallText } from "../../components";
import { MESSAGES } from "../../data/messages";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NotificationSection = () => {
  const {darkMode} = useSelector((state: RootState) => state.auth)
  return (
    <FlatList
      className="flex-1"
      showsVerticalScrollIndicator={false}
      data={MESSAGES}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Spacer value={H("1%")} axis="vertical" />}
      renderItem={({ item }) => (
        <View
          style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
          className="bg-[#0F0F0F] py-2 px-3 flex-row justify-between"
        >
          <View className="flex-1 pr-2 flex-row items-center">
            <View className="h-[60px] justify-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="text-[#D4E1D2] text-left p-0 text-[18px] mb-1"
              >
                {item.name}
              </SmallText>
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="text-left p-0 text-[14px] text-[#696969]"
              >
                {item.lastMessage}
              </SmallText>
            </View>
          </View>
          <View className="h-[60px] justify-center items-end">
            <SmallText className="text-right p-0 text-[14px] text-[#696969] mb-2">
              {item.date}
            </SmallText>
          </View>
        </View>
      )}
    />
  );
};

export default NotificationSection;
