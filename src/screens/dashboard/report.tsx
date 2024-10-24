import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";

import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { Button, InputField, SmallText, Spacer } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { postReport } from "../../api/rating";
import { RouteProp } from "@react-navigation/native";

const Report = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const [report, setReport] = React.useState<string>("");
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // console.log(route.params?.data);
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
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f] mb-3"
        >
          <TitleWithButton title="Report" fire={() => navigation.goBack()} />
        </View>
        <ScrollView className="flex-1 px-3">
          <Spacer axis="vertical" value={H("2%")} />
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
            className="text-[#696969] text-center p-0 text-[17px] pr-2 font-RedHatDisplayRegular"
          >
            Report any issue or concern to Sabifix, type your report below
          </SmallText>
          <Spacer axis="vertical" value={H("3%")} />
          {darkMode ? (
            <InputField
              defaultValue={report}
              onTextChange={(value) => setReport(value)}
              type={"default"}
              autoCapitalize={"sentences"}
              className="border border-[#696969] h-[150px] w-full"
              containerStyle={{ width: "100%", height: 150, borderRadius: 8 }}
              multiline={true}
              numberOfLines={7}
              placeholder="Enter your report"
            />
          ) : (
            <LinearGradient
              colors={["#023215", "#1A911B"]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              className="bg-black overflow-hidden rounded-lg w-[100%] px-[1px] py-[1px]"
            >
              <InputField
                defaultValue={report}
                onTextChange={(value) => setReport(value)}
                type={"default"}
                autoCapitalize={"sentences"}
                containerStyle={{
                  width: "100%",
                  height: 150,
                  backgroundColor: "white",
                  borderRadius: 8,
                }}
                multiline={true}
                numberOfLines={7}
                className="h-[150px] w-full"
                placeholder="Enter your review"
              />
            </LinearGradient>
          )}
          <Spacer axis="vertical" value={H("3%")} />
          <Button
            text="Submit Report"
            buttonStyle={{ width: "100%" }}
            onPress={() => {
              if (report === "") {
                Toast.show({
                  type: "error",
                  text1: "Please enter your report",
                });
              } else if (route.params?.data?.user?.id === profile?.id) {
                Toast.show({
                  type: "error",
                  text1: "You cannot report your listing.",
                });
              } else {
                dispatch(SET_LOADER(true));
                postReport(
                  { listing_id: route.params?.data?.id, report },
                  (response) => {
                    dispatch(SET_LOADER(false));
                    setReport("");
                    Toast.show({
                      type: "success",
                      text1: response.message,
                    });
                  },
                  (error) => {
                    dispatch(SET_LOADER(false));
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                  }
                );
              }
            }}
          />
          <Spacer axis="vertical" value={H("3%")} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Report;
