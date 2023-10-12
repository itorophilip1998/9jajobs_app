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
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LinearGradient } from "expo-linear-gradient";

const Booked = () => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Booked Business
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date booked
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Daniel Oluwakemi
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]">
        <SmallText className="text-[#6A6A6A] text-left p-0">
          Vera Nkechi
        </SmallText>
        <SmallText className="text-[#6A6A6A] text-left p-0">
          12/10/2023
        </SmallText>
      </View>
      <View className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]">
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
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }} className="text-[#D4E1D2] text-left p-0">
          Client Name
        </SmallText>
        <SmallText style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }} className="text-[#D4E1D2] text-left p-0">
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
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [type, setType] = React.useState<"booked" | "booking">("booked");
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
          <TitleWithButton title="Bookings" fire={() => navigation.goBack()} />
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
                ? type !== "booked"
                  ? "#1E1E1E"
                  : "#00000057"
                : type !== "booked"
                ? "transparent"
                : "transparent",
            }}
            onPress={() => setType("booked")}
          >
            {darkMode ? (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booked" ? "#1A911B" : "#696969",
                }}
              >
                Booked
              </SmallText>
            ) : type === "booked" ? (
              <LinearGradient
                className="w-[100%] justify-center items-center rounded-full h-full"
                colors={["#023215", "#1A911B"]}
              >
                <SmallText
                  style={{
                    color: type === "booked" ? "white" : "#696969",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Booked
                </SmallText>
              </LinearGradient>
            ) : (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booking" ? "#696969" : "#1A911B",
                }}
              >
                Booked
              </SmallText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: darkMode
                ? type !== "booking"
                  ? "#1E1E1E"
                  : "#00000057"
                : type !== "booking"
                ? "transparent"
                : "transparent",
            }}
            onPress={() => setType("booking")}
          >
            {darkMode ? (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booking" ? "#1A911B" : "#696969",
                }}
              >
                Booking
              </SmallText>
            ) : type === "booking" ? (
              <LinearGradient
                className="w-[100%] justify-center items-center rounded-full h-full"
                colors={["#023215", "#1A911B"]}
              >
                <SmallText
                  style={{
                    color: type === "booking" ? "white" : "#696969",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Booking
                </SmallText>
              </LinearGradient>
            ) : (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booked" ? "#696969" : "#1A911B",
                }}
              >
                Booking
              </SmallText>
            )}
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
