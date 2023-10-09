import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  
} from "react-native";
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-3"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <TitleWithButton
          title="Filter Search"
          fire={() => navigation.goBack()}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Filter;
