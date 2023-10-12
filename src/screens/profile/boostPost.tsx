import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Button, SmallText, Spacer } from "../../components";
import UserProfileCard from "../../components/userProfileCard";
import { MAIN_USERS } from "../../data/listing";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";

const BoostPost = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = React.useState<string>("");
  //   const sortRef = React.useState<RBSheet | null>(null);
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
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full bg-[#0f0f0f] justify-between px-3 py-4"
        >
          <View className="flex-row items-center w-[65%]">
            <Pressable onPress={() => navigation.goBack()} className="mr-3">
              <Feather name="arrow-left-circle" size={30} color={"#696969"} />
            </Pressable>

            <Pressable
              style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
              className="w-[100%] px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row justify-between items-center"
            >
              <AntDesign
                name="search1"
                size={20}
                color={darkMode ? "#D4E1D2" : "#696969"}
              />
              <TextInput
                keyboardType={"web-search"}
                className={`h-full w-[87%] text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
                onChangeText={(value) => setSearch(value)}
                value={search}
                // onFocus={() => {
                //   onFocus && onFocus();
                // }}
                // onBlur={() => {
                //   onBlur && onBlur();
                // }}
                placeholderTextColor={"#626262"}
                placeholder={"Search here"}
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                autoCapitalize={"none"}
              />
            </Pressable>
          </View>
          <TouchableOpacity className="bg-transparent py-2 px-4 w-auto justify-center items-center rounded-full">
            {darkMode ? (
              <SmallText className="text-white p-0 text-[15px] pl-1">
                Sort by
              </SmallText>
            ) : (
              <GradientText className="text-white p-0 text-[15px] pl-1 font-RedHatDisplayRegular">
                Sort by
              </GradientText>
            )}
          </TouchableOpacity>
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <SmallText
          style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
          className="text-[#696969] text-[20px] text-left p-0 px-3"
        >
          Listed posts
        </SmallText>
        <Spacer value={H("3%")} axis="vertical" />
        <FlatList
          className="px-3 flex-1"
          showsVerticalScrollIndicator={false}
          data={MAIN_USERS}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{ borderBottomColor: darkMode ? "#0f0f0f" : "#696969" }}
              className="border-b-[1px] border-b-[#0f0f0f]"
            />
          )}
          renderItem={({ item }) => (
            <Pressable className="flex-row justify-between items-center w-full py-3">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="text-[#D4E1D2] text-[19px] text-left p-0"
              >
                {item.name}
              </SmallText>
              <Button
                onPress={() => navigation.navigate("Packages")}
                text="Boost Post"
                buttonStyle={{ width: 100 }}
                buttonStyleClassName="h-[40px]"
                textStyleClassName="text-[15px]"
              />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BoostPost;
