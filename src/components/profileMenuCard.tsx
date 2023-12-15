import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import SmallText from "./smallText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shadowBoxDark } from "../style/Typography";

const ProfileMenuCard = ({
  item,
  navigation,
}: {
  item: { name: string; path: string; icon: React.FC<SvgProps> };
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <TouchableOpacity
      onPress={() => {
        if (
          item.name === "Contact Us" ||
          item.name === "FAQ" ||
          item.name === "About"
        ) {
          Linking.openURL(item.path);
        } else {
          navigation.navigate(item.path);
        }
      }}
      className="w-[47%] h-[50px] flex-row items-center bg-[#0f0f0f] py-3 px-3 mb-3 rounded-full"
      style={[
        !darkMode && shadowBoxDark,
        { backgroundColor: darkMode ? "#0f0f0f" : "white" },
      ]}
    >
      <item.icon />
      <SmallText
        style={{ color: darkMode ? "white" : "#0f0f0f" }}
        className="p-0 text-left text-white pl-2 w-[75%]"
        numberOfLine={1}
      >
        {item.name}
      </SmallText>
    </TouchableOpacity>
  );
};

export default ProfileMenuCard;
