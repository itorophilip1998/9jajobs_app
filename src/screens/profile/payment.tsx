import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, InputField, SmallText, Spacer } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "../../components/gradientText";

const Transfer = () => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [transactionID, setTransactionID] = React.useState<string>("");
  return (
    <View className="w-full flex-1">
      <View className="w-full border border-primary py-5 rounded-lg">
        <SmallText className="text-[20px] text-[#696969] p-0 font-RedHatDisplayBold">
          Account Number
        </SmallText>
        <GradientText className="text-[20px] text-primary p-0 font-RedHatDisplayBold text-center mb-2">
          3230049093092
        </GradientText>
        <SmallText className="text-[20px] text-[#696969] p-0 font-RedHatDisplayBold mb-2">
          Name:{" "}
          <SmallText className="text-[20px] text-primary p-0 font-RedHatDisplayRegular ">
            9jajob Inc
          </SmallText>
        </SmallText>
        <SmallText className="text-[20px] text-[#696969] p-0 font-RedHatDisplayBold">
          Bank:{" "}
          <SmallText className="text-[20px] text-primary p-0 font-RedHatDisplayRegular mb-2">
            Access Bank
          </SmallText>
        </SmallText>
      </View>
      <SmallText
        style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
        className="text-[18px] text-[#BDB7C5] p-0 font-RedHatDisplayRegular text-left my-4"
      >
        to proceed, make payment to the account above and upload your
        transaction id
      </SmallText>
      <SmallText className="text-[#D4E1D2] text-left p-0">
        Transaction ID
      </SmallText>
      <Spacer axis="vertical" value={H(1)} />
      <InputField
        onTextChange={(value) => setTransactionID(value)}
        defaultValue={transactionID}
        placeholder="Input your Transaction ID here"
        containerStyle={{ width: "100%" }}
        style={{ backgroundColor: darkMode ? "transparent" : "white" }}
        type={"default"}
        autoCapitalize={"none"}
        className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
      />
      <Spacer axis="vertical" value={H(3)} />
      <Button text="Verify ID" buttonStyle={{ width: "100%" }} />
      <Spacer axis="vertical" value={H(3)} />
    </View>
  );
};

const CardPayment = () => {
  const [cardNumber, setCardNumber] = React.useState<string>("");
  const [cardHolder, setCardHolder] = React.useState<string>("");
  const [cvc, setCvc] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [expiryDate, setExpiryDate] = React.useState<string>("");
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full flex-1">
      <SmallText
        style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
        className="text-[#D4E1D2] text-left p-0"
      >
        Card Number
      </SmallText>
      <Spacer axis="vertical" value={H(1)} />
      <InputField
        onTextChange={(value) => setCardNumber(value)}
        defaultValue={cardNumber}
        placeholder="Input your card number here"
        containerStyle={{ width: "100%" }}
        type={"default"}
        style={{ backgroundColor: darkMode ? "transparent" : "white" }}
        autoCapitalize={"none"}
        className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
      />
      <Spacer axis="vertical" value={H(3)} />
      <View className="w-full flex-row justify-between items-center">
        <View className="w-[47%]">
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            CVC
          </SmallText>
          <Spacer axis="vertical" value={H(1)} />
          <InputField
            onTextChange={(value) => setCvc(value)}
            defaultValue={cvc}
            placeholder="123"
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            containerStyle={{ width: "100%" }}
            type={"numeric"}
            autoCapitalize={"none"}
            className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
          />
        </View>
        <View className="w-[47%]">
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Expiry date
          </SmallText>
          <Spacer axis="vertical" value={H(1)} />
          <InputField
            onTextChange={(value) => setExpiryDate(value)}
            defaultValue={expiryDate}
            placeholder="mm/yy"
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            containerStyle={{ width: "100%" }}
            type={"numeric"}
            autoCapitalize={"none"}
            className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
          />
        </View>
      </View>
      <Spacer axis="vertical" value={H(3)} />
      <SmallText
        style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
        className="text-[#D4E1D2] text-left p-0"
      >
        Holder Name
      </SmallText>
      <Spacer axis="vertical" value={H(1)} />
      <InputField
        onTextChange={(value) => setCardHolder(value)}
        defaultValue={cardHolder}
        placeholder="Input card holder name"
        containerStyle={{ width: "100%" }}
        type={"default"}
        style={{ backgroundColor: darkMode ? "transparent" : "white" }}
        autoCapitalize={"none"}
        className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
      />
      <Spacer axis="vertical" value={H(3)} />
      <SmallText
        style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
        className="text-[#D4E1D2] text-left p-0"
      >
        Amount
      </SmallText>
      <Spacer axis="vertical" value={H(1)} />
      <InputField
        onTextChange={(value) => setAmount(value)}
        defaultValue={amount}
        placeholder="Enter amount here"
        containerStyle={{ width: "100%" }}
        type={"numeric"}
        autoCapitalize={"none"}
        style={{ backgroundColor: darkMode ? "transparent" : "white" }}
        className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
      />
      <Spacer axis="vertical" value={H(3)} />
      <Button text="Fund Account" buttonStyle={{ width: "100%" }} />
      <Spacer axis="vertical" value={H(3)} />
    </View>
  );
};

const Payment = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [type, setType] = React.useState<"transfer" | "payment">("transfer");
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
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="Payment" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View
          style={{ backgroundColor: darkMode ? "#1E1E1E" : "white" }}
          className="w-[80%] bg-[#1E1E1E] mx-auto h-[48px] rounded-full flex-row justify-center overflow-hidden"
        >
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: darkMode
                ? type !== "transfer"
                  ? "#1E1E1E"
                  : "#00000057"
                : type !== "transfer"
                ? "transparent"
                : "transparent",
            }}
            onPress={() => setType("transfer")}
          >
            {darkMode ? (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "transfer" ? "#1A911B" : "#696969",
                }}
              >
                Transfer
              </SmallText>
            ) : type === "transfer" ? (
              <LinearGradient
                className="w-[100%] justify-center items-center rounded-full h-full"
                colors={["#023215", "#1A911B"]}
              >
                <SmallText
                  style={{
                    color: type === "transfer" ? "white" : "#696969",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Transfer
                </SmallText>
              </LinearGradient>
            ) : (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "payment" ? "#696969" : "#1A911B",
                }}
              >
                Transfer
              </SmallText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: darkMode
                ? type !== "payment"
                  ? "#1E1E1E"
                  : "#00000057"
                : type !== "payment"
                ? "transparent"
                : "transparent",
            }}
            onPress={() => setType("payment")}
          >
            {darkMode ? (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "payment" ? "#1A911B" : "#696969",
                }}
              >
                Card Payment
              </SmallText>
            ) : type === "payment" ? (
              <LinearGradient
                className="w-[100%] justify-center items-center rounded-full h-full"
                colors={["#023215", "#1A911B"]}
              >
                <SmallText
                  style={{
                    color: type === "payment" ? "white" : "#696969",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Card Payment
                </SmallText>
              </LinearGradient>
            ) : (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "transfer" ? "#696969" : "#1A911B",
                }}
              >
                Card Payment
              </SmallText>
            )}
          </TouchableOpacity>
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <ScrollView className="px-3 flex-1">
          {type === "transfer" && <Transfer />}
          {type === "payment" && <CardPayment />}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Payment;
