import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacer, SmallText } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const Booked = () => {
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText className="text-[#D4E1D2] text-left p-0">
          Booked Business
        </SmallText>
        <SmallText className="text-[#D4E1D2] text-left p-0">
          Date booked
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Daniel Oluwakemi
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Vera Nkechi
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Stephen Donald
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Christian Okoro
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
    </View>
  );
};

const Booking = () => {
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText className="text-[#D4E1D2] text-left p-0">
          Client Name
        </SmallText>
        <SmallText className="text-[#D4E1D2] text-left p-0">
          Date booked
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Daniel Oluwakemi
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Vera Nkechi
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Stephen Donald
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-y border-y-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Christian Okoro
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
    </View>
  );
};

const Bookings = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [type, setType] = React.useState<"booked" | "booking">("booked");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black pb-4">
        <View className="relative flex flex-row items-center w-full justify-between px-3 py-2 bg-[#0f0f0f]">
          <TitleWithButton title="Bookings" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View className="w-[80%] bg-[#1E1E1E] mx-auto h-[48px] rounded-full flex-row justify-center overflow-hidden">
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: type !== "booked" ? "#1E1E1E" : "#00000057",
            }}
            onPress={() => setType("booked")}
          >
            <SmallText
              className="!text-[16px] !text-white"
              style={{ color: type === "booked" ? "#1A911B" : "#696969" }}
            >
              Booked
            </SmallText>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: type !== "booking" ? "#1E1E1E" : "#00000057",
            }}
            onPress={() => setType("booking")}
          >
            <SmallText
              className="!text-[16px] !text-white"
              style={{
                color: type === "booking" ? "#1A911B" : "#696969",
              }}
            >
              My Bookings
            </SmallText>
          </TouchableOpacity>
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <ScrollView className="px-3 flex-1">
          {type === "booked" && <Booked />}
          {type === "booking" && <Booking />}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Bookings;
