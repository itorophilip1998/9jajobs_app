import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { Button, PrimaryText, SmallText } from "../../components";
import logo from "../../../assets/images/logo.png";
import body from "../../../assets/images/body.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Welcome = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <ImageBackground
      source={body}
      className="flex-1 bg-[#023215] py-9 justify-between items-center px-4"
    >
      <View className="w-full items-end mt-3">
        <PrimaryText
          className="!text-white"
          onPress={() => navigation.navigate("Finish")}
        >
          Skip
        </PrimaryText>
      </View>
      <View className="w-full items-center">
        <Image source={logo} alt="" className="h-[150px] w-[200px]" resizeMode="contain"/>
        
      </View>
      <View>
        <SmallText className="text-[18px] !text-white px-9">
          Your No. 1 Nigeria Business/ Service Center
        </SmallText>
        <View className="flex-row justify-center my-5">
          <View className="border-2 mx-1 bg-white border-white rounded-full h-[10px] w-[10px]" />
          <View className="border-2 mx-1 border-white rounded-full h-[10px] w-[10px]" />
          <View className="border-2 mx-1 border-white rounded-full h-[10px] w-[10px]" />
        </View>
        <View className="max-w-[150px]  mx-auto">
          <Button
            text={"Next"}
            buttonStyle={{ width: "100%" }}
            onPress={() => navigation.navigate("Body")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
