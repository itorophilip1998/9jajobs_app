import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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

const Reviews = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-4"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleWithButton title="Reviews" fire={() => navigation.goBack()} />
          <Spacer value={H("1%")} axis="vertical" />
          <View className="flex-row h-[auto] w-full">
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
          <Spacer value={H("3%")} axis="vertical" />
          <ReviewCard />
          <Spacer value={H("3%")} axis="vertical" />
          <Button
            text="Add Review"
            onPress={() => navigation.navigate("AddReview")}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Reviews;
