import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SmallText, Spacer } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import { shadowBox } from "../../style/Typography";
import { COLORS } from "../../utility/colors";
import { Ionicons } from "@expo/vector-icons";
import { REFERRAL_HISTORY } from "../../data/transactions";
import { FirstLetterUppercase } from "../../utility/helpers";
import * as Clipboard from "expo-clipboard";

const Referrals = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-[#0f0f0f] pb-4">
        <View className="relative flex flex-row items-center w-full justify-between px-3 py-2 bg-[#0f0f0f]">
          <TitleWithButton title="Referrals" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View className="w-full px-3">
          <SmallText className="text-[#696969] text-center text-[20px] p-0">
            Your Referral history
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
          <View
            style={shadowBox}
            className="items-center w-full px-5 py-4 bg-black rounded-2xl"
          >
            <View className="w-auto flex-row justify-between items-center mb-2">
              <View>
                <SmallText className="text-primary text-center text-[20px] p-0 mb-1">
                  ₦150
                </SmallText>
                <SmallText className="text-[#696969] text-center text-[15px] p-0">
                  Total Earned
                </SmallText>
              </View>
              <View className="mx-5">
                <SmallText className="text-primary text-center text-[20px] p-0 mb-1">
                  5
                </SmallText>
                <SmallText className="text-[#696969] text-center text-[15px] p-0">
                  Completed
                </SmallText>
              </View>
              <View>
                <SmallText className="text-primary text-center text-[20px] p-0 mb-1">
                  12
                </SmallText>
                <SmallText className="text-[#696969] text-center text-[15px] p-0">
                  Pending
                </SmallText>
              </View>
            </View>
            <View className="mx-auto flex-row items-center mt-2">
              <SmallText className="text-[#696969] text-center text-[18px] p-0 mr-2">
                Code:{" "}
                <SmallText className="text-[#FFFFFF] text-center text-[18px] p-0">
                  93jskkl43
                </SmallText>
              </SmallText>
              <Ionicons
                name="ios-copy-outline"
                size={24}
                color={COLORS.primary}
                onPress={async () => {
                  await Clipboard.setStringAsync("93jskkl43");
                }}
              />
            </View>
          </View>
          <Spacer value={H("4%")} axis="vertical" />
        </View>
        <View className="flex-1 w-full py-3 bg-black">
          <FlatList
            ListHeaderComponent={
              <View className="w-full flex-row justify-between items-center mb-4">
                <SmallText className="text-[#696969] text-left p-0 text-[20px]">
                  Total Referrals
                </SmallText>
                <SmallText className="text-[#696969] font-RedHatDisplayBold text-left p-0 text-[20px]">
                  20
                </SmallText>
              </View>
            }
            className="px-3 mt-3"
            showsVerticalScrollIndicator={false}
            data={REFERRAL_HISTORY}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            renderItem={({ item }) => (
              <Pressable className="w-full">
                <View className="flex-row justify-between items-center w-full mb-1">
                  <SmallText className="text-[#BDB7C5] text-left p-0 text-[18px]">
                    {item.name}
                  </SmallText>
                  <SmallText className="text-[#BDB7C5] text-right p-0 text-[18px]">
                    ₦{item.amount.toLocaleString()}
                  </SmallText>
                </View>
                <View className="flex-row justify-between items-center w-full">
                  <SmallText className="text-[#696969] text-left p-0 text-[15px]">
                    {item.status}
                  </SmallText>
                  <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px]">
                    {item.date}
                  </SmallText>
                </View>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Referrals;
