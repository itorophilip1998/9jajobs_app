import { View, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Spacer, SmallText } from "../../components";
import { MESSAGES } from "../../data/messages";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const NotificationSection = () => {
  return (
    <FlatList
      className="flex-1"
      showsVerticalScrollIndicator={false}
      data={MESSAGES}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Spacer value={H("3%")} axis="vertical" />}
      renderItem={({ item }) => (
        <View className="bg-[#0F0F0F] py-3 px-3 flex-row justify-between">
          <View className="flex-1 pr-2 flex-row items-center">
            <View className="h-[60px] justify-center">
              <SmallText className="text-[#D4E1D2] text-left p-0 text-[18px] mb-2">
                {item.name}
              </SmallText>
              <SmallText className="text-left p-0 text-[14px] text-[#696969]">
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
