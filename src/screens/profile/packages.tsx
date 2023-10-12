import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, SmallText, Spacer } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { COLORS } from "../../utility/colors";
import { Entypo } from "@expo/vector-icons";
import { shadowBox, shadowBoxDark } from "../../style/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Packages = ({
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
      <SafeAreaView className="flex-1 w-full pb-4">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-transparent"
        >
          <TitleWithButton title="Packages" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <ScrollView className="px-3">
          {["", "", ""].map((item, idx) => (
            <View
              key={idx}
              style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
              className="w-full bg-[#0F0F0F] px-3 py-3 rounded-xl mb-5"
            >
              <View className="flex-row items-start justify-between w-full">
                <SmallText
                  style={{ color: darkMode ? "white" : "#0f0f0f" }}
                  className="text-white text-left text-[20px] p-0 w-[48%]"
                >
                  Online Services only
                </SmallText>
                <SmallText className="text-primary text-left font-RedHatDisplayBold text-[20px] p-0 w-[48%]">
                  $0/365 days
                </SmallText>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    2 listing allowed
                  </SmallText>
                </View>
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    2 amenities per listing
                  </SmallText>
                </View>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    10 photos per listing
                  </SmallText>
                </View>
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    5 videos per listing
                  </SmallText>
                </View>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    5 social itesm per listing
                  </SmallText>
                </View>
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    2 additional features per listing
                  </SmallText>
                </View>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    featured listing allowed
                  </SmallText>
                </View>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <Button
                text="Enroll Now"
                buttonStyleClassName="rounded-lg"
                buttonStyle={{ width: "100%" }}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Packages;
