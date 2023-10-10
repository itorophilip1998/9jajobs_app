import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import TitleWithButton from "../../components/titleWithButton";

const Filter = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#D4E1D2",
      }}
    >
      <SafeAreaView className="flex-1 w-full">
        <View
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton
            title="Filter Search"
            fire={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Filter;
