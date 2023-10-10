import { View, Text } from "react-native";
import React from "react";
import SmallText from "./smallText";
import { mediumFonts } from "../style/Typography";

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
          borderTopColor: "#252323F5",
          borderTopWidth: 1,
          width: "40%",
        }}
      />
      <SmallText className="!text-[#696969]" style={mediumFonts}>or</SmallText>
      <View
        style={{
          borderTopColor: "#252323F5",
          borderTopWidth: 1,
          width: "40%",
        }}
      />
    </View>
  );
};

export default GoogleLineSeperator;
