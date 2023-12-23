import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const BorderBottom = () => {
  const {darkMode} = useSelector((state: RootState) => state.auth)
  return darkMode ? (
    <View className="w-full border-b border-b-[#0F0F0F]" />
  ) : (
    <View className="w-full border-b border-b-[#69696926]" />
  );
};

export default BorderBottom;
