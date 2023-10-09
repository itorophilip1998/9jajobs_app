import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import SmallText from "./smallText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProfileMenuCard = ({
  item,
  navigation,
}: {
  item: { name: string; path: string; icon: React.FC<SvgProps> };
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (
          item.name === "Privacy Policy" ||
          item.name === "Feedback" ||
          item.name === "FAQ" ||
          item.name === "About"
        ) {
          Linking.openURL(item.path);
        } else {
          navigation.navigate(item.path);
        }
      }}
      className="w-[47%] h-[50px] flex-row items-center bg-[#0f0f0f] py-3 px-3 mb-3 rounded-full"
    >
      <item.icon />
      <SmallText className="p-0 text-left text-white pl-2">
        {item.name}
      </SmallText>
    </TouchableOpacity>
  );
};

export default ProfileMenuCard;
