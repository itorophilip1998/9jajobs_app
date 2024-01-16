import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, SmallText, Spacer, Title } from "../../components";

const Terms = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.auth);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#FFFFFF",
      }}
    >
      <SafeAreaView className="flex-1 w-full">
        <Title
          style={{ color: darkMode ? "white" : "#0f0f0f" }}
          className="text-white px-3 py-3"
        >
          Terms and condition
        </Title>
        <ScrollView className="w-full flex-1">
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
            className="text-[#696969] text-left text-lg"
          >
            {data?.terms}
          </SmallText>
        </ScrollView>

        <Button
          text={"Close"}
          onPress={() => navigation.goBack()}
          buttonStyleClassName="mx-auto my-3"
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Terms;
