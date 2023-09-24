import { View, Text } from "react-native";
import React from "react";
import SmallText from "./smallText";

const GoogleLineSeperator = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderTopColor: "#B6B6B6",
          borderTopWidth: 1,
          width: "40%",
        }}
      />
      <SmallText className="!text-[#B6B6B6]">or</SmallText>
      <View
        style={{
          borderTopColor: "#B6B6B6",
          borderTopWidth: 1,
          width: "40%",
        }}
      />
    </View>
  );
};

export default GoogleLineSeperator;
