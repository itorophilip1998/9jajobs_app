import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  BottomSheet,
  Button,
  InputField,
  PrimaryText,
  SmallText,
  Spacer,
} from "../../components";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import { FirstLetterUppercase } from "../../utility/helpers";
import Checkbox from "expo-checkbox";
import VideoCard from "../../components/videoCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import { shadowBoxDark } from "../../style/Typography";

const FreelancerProfile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [homeDelivery, setHomeDelivery] = React.useState<boolean>(false);
  const [nationWideDelivery, setNationWideDelivery] =
    React.useState<boolean>(false);

  const bookRef = React.useRef<RBSheet | null>(null);
  const [day, setDay] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");

  const [hour, setHour] = React.useState<string>("");
  const [minutes, setMinutes] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-4"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "white",
      }}
    >
      <SafeAreaView className="flex-1 w-full py-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleWithButton title="" fire={() => navigation.goBack()} />
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
            }}
            alt=""
            className=" w-[160px] h-[160px] rounded-full mx-auto"
          />
          <Spacer value={H("3%")} axis="vertical" />
          <View className="flex-row items-center justify-between mt-2 w-full">
            <View className="w-[50%]">
              <View className="flex-row items-center mb-1 w-full">
                {darkMode ? (
                  <SmallText className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplaySemiBold">
                    {FirstLetterUppercase("collins Vincent")}
                  </SmallText>
                ) : (
                  <GradientText className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplaySemiBold">
                    {FirstLetterUppercase("collins Vincent")}
                  </GradientText>
                )}
                <MaterialIcons
                  name="verified"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <Spacer value={H("0.5%")} axis="vertical" />
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[15px]"
              >
                {FirstLetterUppercase("Real Estate")}
              </SmallText>
              <Spacer value={H("1%")} axis="vertical" />
              <View className="flex-row justify-between items-center mb-1 w-full">
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
                  {FirstLetterUppercase("1.2 Km Away")}
                </SmallText>

                <View className="flex-row items-center">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[15px] pl-1">
                    4.2
                  </SmallText>
                </View>
              </View>
            </View>
            <View className="flex-row items-center justify-between w-[45%]">
              <TouchableOpacity className="items-center">
                <View
                  style={
                    !darkMode && { ...shadowBoxDark, backgroundColor: "white" }
                  }
                  className="p-2 rounded-full bg-[#121212] mb-2"
                >
                  <Ionicons name="call" size={23} color={COLORS.primary} />
                </View>
                <SmallText className="text-primary text-left p-0 text-[15px]">
                  Call
                </SmallText>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <View
                  style={
                    !darkMode && { ...shadowBoxDark, backgroundColor: "white" }
                  }
                  className="p-2 rounded-full bg-[#121212] mb-2"
                >
                  <Ionicons
                    name="md-chatbox-ellipses-outline"
                    size={23}
                    color={COLORS.primary}
                  />
                </View>
                <SmallText className="text-primary text-left p-0 text-[15px]">
                  Chat
                </SmallText>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center"
                onPress={() => navigation.navigate("Report")}
              >
                <View
                  style={
                    !darkMode && { ...shadowBoxDark, backgroundColor: "white" }
                  }
                  className="p-2 rounded-full bg-[#121212] mb-2"
                >
                  <AntDesign
                    name="exclamationcircleo"
                    size={23}
                    color={COLORS.primary}
                  />
                </View>
                <SmallText className="text-primary text-left p-0 text-[15px]">
                  Report
                </SmallText>
              </TouchableOpacity>
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="flex-row items-center">
            <AntDesign name="idcard" size={30} color={COLORS.primary} />
            {darkMode ? (
              <SmallText className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold">
                Contact Information
              </SmallText>
            ) : (
              <GradientText className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold">
                Contact Information
              </GradientText>
            )}
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Phone Number
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              07041528380
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Email Address
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              vincentovie39@gmail.com
            </SmallText>
          </View>
          <View
            style={{
              borderTopColor: darkMode ? "#0F0F0F" : "#69696926",
              borderBottomColor: darkMode ? "#0F0F0F" : "#69696926",
            }}
            className="py-3 flex-row justify-between items-center border-y border-y-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Location
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              Abuja, Nigeria
            </SmallText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-full flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Octicons name="megaphone" size={28} color={COLORS.primary} />
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold"
              >
                Amenities
              </SmallText>
            </View>
            <PrimaryText onPress={() => navigation.navigate("Reviews")}>
              See Reviews
            </PrimaryText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className=" flex-row items-center">
            <Checkbox
              color={"#1A911B"}
              value={homeDelivery}
              onValueChange={setHomeDelivery}
            />
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[15px] !text-[#696969] text-left !pl-3"
            >
              Home Delivery
            </SmallText>
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <View className=" flex-row items-center">
            <Checkbox
              color={"#1A911B"}
              value={nationWideDelivery}
              onValueChange={setNationWideDelivery}
            />
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[15px] !text-[#696969] text-left !pl-3"
            >
              Nationwide Delivery
            </SmallText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
          >
            About
          </SmallText>
          <Spacer value={H("2%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[15px] font-RedHatDisplayRegular"
          >
            Lorem ipsum dolor sit amet consectetur. Dis nullam enim pharetra
            bibendum purus. Blandit faucibus facilisis blandit mauris
            consectetur ultrices in mattis. Aliquet orci morbi sapien elementum.
            Adipiscing proin venenatis morbi nascetur erat praesent fermentum
            fames. Adipiscing etiam netus velit magna magnis ac placerat orci.
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
          >
            Photos
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              alt=""
              className="w-[90px] h-[90px] rounded-full"
            />
            <Spacer value={W("5%")} axis="horizontal" />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              alt=""
              className="w-[90px] h-[90px] rounded-full"
            />
            <Spacer value={W("5%")} axis="horizontal" />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              alt=""
              className="w-[90px] h-[90px] rounded-full"
            />
            <Spacer value={W("5%")} axis="horizontal" />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              alt=""
              className="w-[90px] h-[90px] rounded-full"
            />
          </ScrollView>
          <Spacer value={H("3%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
          >
            Videos
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <VideoCard />
            <Spacer value={W("5%")} axis="horizontal" />
            <VideoCard />
            <Spacer value={W("5%")} axis="horizontal" />
            <VideoCard />
            <Spacer value={W("5%")} axis="horizontal" />
            <VideoCard />
            <Spacer value={W("5%")} axis="horizontal" />
            <VideoCard />
          </ScrollView>
          {/* <Spacer value={H("3%")} axis="vertical" /> */}

          <Spacer value={H("3%")} axis="vertical" />
          <Button text="Book Now" onPress={() => bookRef.current?.open()} />
          <Spacer value={H("1%")} axis="vertical" />
        </ScrollView>
      </SafeAreaView>
      <BottomSheet ref={bookRef} duration={3000} height={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          className="flex-1 bg-[#1b1b1b] py-5 px-3"
        >
          <View className="w-full flex-row justify-between items-center">
            <View className="w-[23%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Day
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setDay(value);
                }}
                defaultValue={day}
                placeholder="02"
                className="border border-[#696969] bg-[#000000]"
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
            <View className="w-[30%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Month
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setMonth(value);
                }}
                defaultValue={month}
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                placeholder="05"
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
            <View className="w-[30%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Year
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setYear(value);
                }}
                placeholder="2022"
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                defaultValue={year}
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-[60%] flex-row justify-between items-center">
            <View className="w-[40%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
              >
                Time
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setHour(value);
                }}
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                defaultValue={hour}
                placeholder="14"
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[40px] mt-5 font-RedHatDisplayRegular"
            >
              :
            </SmallText>
            <View className="w-[40%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                {" "}
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setMinutes(value);
                }}
                defaultValue={minutes}
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                placeholder="60"
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          {/* <View className="w-full">
            <SmallText style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }} className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular">
              Location
            </SmallText>
            <InputField
            style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setLocation(value);
              }}
              placeholder="input your address"
              defaultValue={location}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"numeric"}
              autoCapitalize={"none"}
            />
          </View>
          <Spacer value={H("3%")} axis="vertical" /> */}
          <Button text="Book Date" />
          <Spacer value={H("6%")} axis="vertical" />
        </ScrollView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default FreelancerProfile;
