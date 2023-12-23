import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Button, SmallText, Spacer } from "../../components";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import { FirstLetterUppercase } from "../../utility/helpers";
import ReviewCard from "../../components/reviewCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MyReviews = ({
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
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f] mb-3"
        >
          <TitleWithButton title="Reviews" fire={() => navigation.goBack()} />
        </View>
        <ScrollView className="px-3" showsVerticalScrollIndicator={false}>
          <Spacer value={H("1%")} axis="vertical" />
          {/* <View className="flex-row h-[auto] w-full">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              alt=""
              className="w-[90px] h-[90px] rounded-full"
            />
            <View className="flex-1 py-2 px-3">
              <View className="flex-row items-center mb-1 w-full">
                <SmallText className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplayMedium">
                  {FirstLetterUppercase("collins Vincent")}
                </SmallText>
                <MaterialIcons
                  name="verified"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <SmallText className="text-[#D4E1D2] text-left p-0 text-[15px] w-full">
                {FirstLetterUppercase("Fashion Designer")}
              </SmallText>
              <View className="flex-row items-center  mt-2 w-full">
                <SmallText className="text-[#696969] text-right p-0 text-[13px]">
                  {FirstLetterUppercase("Abuja, Nigeria")}
                </SmallText>
                <View className="flex-row items-center ml-4">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[13px] pl-1">
                    4.2
                  </SmallText>
                </View>
              </View>
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" /> */}
          <ReviewCard item={undefined} />
          <Spacer value={H("3%")} axis="vertical" />
          <ReviewCard item={undefined} />
          <Spacer value={H("3%")} axis="vertical" />
          <ReviewCard item={undefined} />
          <Spacer value={H("3%")} axis="vertical" />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyReviews;
