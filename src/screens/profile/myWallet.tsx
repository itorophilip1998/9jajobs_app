import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import TitleWithButton from "../../components/titleWithButton";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import {
  BottomSheet,
  Button,
  InputField,
  PrimaryText,
  SmallText,
  Spacer,
} from "../../components";
import FundIcon from "../../../assets/icons/fund.svg";
import PaymentIcon from "../../../assets/icons/payment.svg";
import WithdrawIcon from "../../../assets/icons/withdraw.svg";
import { TRANSACTION } from "../../data/transactions";
import { COLORS } from "../../utility/colors";
import { FirstLetterUppercase } from "../../utility/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import RBSheet from "react-native-raw-bottom-sheet";

const MyWallet = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [acctNo, setAcctNo] = React.useState<string>("");
  const [bankName, setBankName] = React.useState<string>("");
  const [acctName, setAcctName] = React.useState<string>("");
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const withdrawRef = React.useRef<RBSheet | null>(null);
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
            <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
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
            <TouchableOpacity onPress={() => withdrawRef.current?.open()}>
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
      <BottomSheet ref={withdrawRef} duration={3000} height={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          className="flex-1 bg-[#1b1b1b] py-5 px-3"
        >
          <View className="w-full">
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Account Number
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setAcctNo(value);
              }}
              placeholder="input your account number"
              defaultValue={acctNo}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"numeric"}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Bank Name
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setBankName(value);
              }}
              placeholder="input your bank name"
              defaultValue={bankName}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"default"}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Account Name
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setAcctName(value);
              }}
              placeholder="input your account name"
              defaultValue={acctName}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"default"}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <Button text="Withdraw" buttonStyle={{ width: "100%" }} />
          <Spacer value={H("6%")} axis="vertical" />
        </ScrollView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default MyWallet;
