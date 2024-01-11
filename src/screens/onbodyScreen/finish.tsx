import { View, Text, Image, Linking } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PrimaryText, SmallText, Button } from "../../components";
import Checkbox from "expo-checkbox";
import logo from "../../../assets/images/logo.png";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { SET_ON_BOARD } from "../../store/authSlice";

const Finish = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = React.useState(false);
  return (
    <View className="flex-1 bg-black py-9 justify-between items-center px-4">
      <View className="w-full items-end mt-3"></View>
      <View className="w-full items-center">
        <Image
          source={logo}
          alt=""
          className="h-[150px] w-[200px]"
          resizeMode="contain"
        />
      </View>
      <View>
        <View className="px-3 flex-row items-center">
          <Checkbox
            color={"#1A911B"}
            value={isChecked}
            onValueChange={setChecked}
          />
          <SmallText className="text-[15px] !text-[#696969] text-left !pl-3">
            By clicking, you agree to our{" "}
            <Text
              className="text-primary underline"
              onPress={() => navigation.navigate("Terms")}
            >
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text
              className="text-primary underline"
              onPress={() => navigation.navigate("Privacy")}
            >
              Privacy Policy
            </Text>
          </SmallText>
        </View>
        <View className="flex-row justify-center my-5">
          <View className="border-2 mx-1 border-white rounded-full h-[10px] w-[10px]" />
          <View className="border-2 mx-1 border-white rounded-full h-[10px] w-[10px]" />
          <View className="border-2 mx-1 bg-white border-white rounded-full h-[10px] w-[10px]" />
        </View>
        <View className="mx-auto max-w-[150px]">
          <Button
            text={"Next"}
            buttonStyle={{ width: "100%" }}
            onPress={() => {
              if (isChecked) {
                dispatch(SET_ON_BOARD(true));
              } else {
                Toast.show({
                  type: "error",
                  text1: "Accept terms and Conditions to continue.",
                });
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Finish;
