import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import TitleWithButton from "../../components/titleWithButton";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Button, PrimaryText, SmallText, Spacer } from "../../components";
import FundIcon from "../../../assets/icons/fund.svg";
import PaymentIcon from "../../../assets/icons/payment.svg";
import WithdrawIcon from "../../../assets/icons/withdraw.svg";
import { TRANSACTION } from "../../data/transactions";
import { COLORS } from "../../utility/colors";
import { FirstLetterUppercase } from "../../utility/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";

const MyWallet = ({
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
      <SafeAreaView className="flex-1 w-full ">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="Wallet" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View className="w-full px-3">
          <View
            className="h-[150px] w-full rounded-2xl bg-[#0F0F0F] justify-center"
            style={{
              backgroundColor: darkMode ? "#0F0F0F" : "#FFFFFF",
              borderWidth: darkMode ? 1 : 0,
              borderColor: darkMode ? "#696969" : "transparent",
            }}
          >
            <SmallText className="text-[#696969] font-RedHatDisplaySemiBold text-center p-0 text-[20px]">
              Available Balance
            </SmallText>
            <Spacer value={H("1%")} axis="vertical" />
            <GradientText className="text-primary font-RedHatDisplaySemiBold text-center p-0 text-[20px]">
              ₦ 15,480
            </GradientText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-full flex-row justify-between items-center">
            <TouchableOpacity>
              <FundIcon />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-[#696969] text-[14px] text-left p-0 pt-2"
              >
                Fund Wallet
              </SmallText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
              <PaymentIcon />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-[#696969] text-[14px] text-left p-0 pt-2"
              >
                Payment
              </SmallText>
            </TouchableOpacity>
            <TouchableOpacity>
              <WithdrawIcon />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-[#696969] text-[14px] text-left p-0 pt-2"
              >
                Withdraw
              </SmallText>
            </TouchableOpacity>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-full flex-row justify-between items-center">
            <SmallText
              style={{ color: darkMode ? "#6A6A6A" : "#0f0f0f" }}
              className="text-[#6A6A6A] text-center p-0 text-[20px]"
            >
              Transaction History
            </SmallText>
            <GradientText className="text-primary font-RedHatDisplaySemiBold text-center p-0 text-[15px]">
              View All
            </GradientText>
          </View>
        </View>
        <FlatList
          className="px-3 mt-3"
          showsVerticalScrollIndicator={false}
          data={TRANSACTION}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("3%")} axis="vertical" />
          )}
          ListFooterComponent={<Spacer value={H("3%")} axis="vertical" />}
          renderItem={({ item }) => (
            <Pressable className="w-full">
              <View className="flex-row justify-between items-center w-full mb-1">
                <SmallText
                  style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
                  className="text-[#BDB7C5] text-left p-0 text-[18px]"
                >
                  {item.name}
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
                  className="text-[#BDB7C5] text-right p-0 text-[18px]"
                >
                  ₦ {item.amount.toLocaleString()}
                </SmallText>
              </View>
              <View className="flex-row justify-between items-center w-full">
                <SmallText className="text-[#696969] text-left p-0 text-[15px]">
                  {item.description}
                </SmallText>
                <SmallText
                  style={{
                    color:
                      item.type === "debit" ? COLORS.danger : COLORS.primary,
                  }}
                  className="text-[#6A6A6A] text-right p-0 text-[15px]"
                >
                  {FirstLetterUppercase(item.type)}
                </SmallText>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyWallet;
