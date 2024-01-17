import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import bg from "../../../assets/images/body2.jpg";
import logo from "../../../assets/images/logo.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PrimaryText, SmallText, Button } from "../../components";

const Body = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <ImageBackground
      source={bg}
      className="flex-1 py-9 justify-between items-center px-4"
    >
      <View className="w-full">
        <View className="w-full items-start mt-3">
          <Image
            source={logo}
            alt=""
            className="h-[60px] w-[110px]"
            resizeMode="contain"
          />
        </View>
        <View className="w-full items-end mt-3">
          <PrimaryText
            className="!text-white "
            onPress={() => navigation.navigate("Finish")}
          >
            Skip
          </PrimaryText>
        </View>
      </View>
      {/* <View className="w-full items-center">
        <Image source={logo} alt="" className="h-[100px] w-[100px]" />
        <SmallText className="!text-white text-[30px]">9jajob</SmallText>
      </View> */}
      <View>
        <SmallText className="text-[18px] !text-white px-9">
          Refer and earn with 9jajob today
        </SmallText>
        <View className="flex-row justify-center my-5">
          <View className="border-2 mx-1 border-white rounded-full h-[10px] w-[10px]" />
          <View className="border-2 mx-1 bg-white border-white rounded-full h-[10px] w-[10px]" />
          <View className="border-2 mx-1 border-white rounded-full h-[10px] w-[10px]" />
        </View>
        <View className="mx-auto max-w-[150px]">

        <Button text={"Next"} buttonStyle={{width: "100%"}} onPress={() => navigation.navigate("Finish")} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Body;
