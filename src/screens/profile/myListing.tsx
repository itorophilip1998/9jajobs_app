import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SmallText, Spacer, Button } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { Feather, AntDesign } from "@expo/vector-icons";
import search from "../modals/search";
import { MAIN_USERS } from "../../data/listing";
import { COLORS } from "../../utility/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { shadowBoxDark } from "../../style/Typography";

const MyListing = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [id, setID] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
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
              className="w-[90%] px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row justify-between items-center"
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
          {darkMode ? (
            <TouchableOpacity className="bg-black py-2 px-4 w-auto justify-center items-center rounded-full">
              <SmallText className="text-white p-0 text-[15px] pl-1">
                Sort by
              </SmallText>
            </TouchableOpacity>
          ) : (
            <Button text="Sort by" buttonStyle={{ width: 80, height: 40 }} />
          )}
        </View>

        <FlatList
          ListHeaderComponent={
            <>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="px-3 flex-row justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-[#696969] text-[20px] text-left p-0 w-[45%]"
                >
                  Brand Name
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-[#696969] text-[20px] text-left p-0 w-[45%]"
                >
                  Action
                </SmallText>
              </View>
              <Spacer value={H("2%")} axis="vertical" />
            </>
          }
          className=" flex-1"
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
            <Pressable
              onPress={() => setID(item.id.toString())}
              style={{
                backgroundColor:
                  item.id.toString() === id ? "#023215" : "transparent",
              }}
              className="flex-row px-3 justify-between items-center w-full py-2"
            >
              <SmallText
                style={{
                  color: item.id.toString() === id ? "#D4E1D2" : "#696969",
                }}
                className="text-[#D4E1D2] text-[19px] w-[45%] text-left p-0"
              >
                {item.name}
              </SmallText>
              <View className="w-[47%] flex-row justify-between items-center">
                <TouchableOpacity
                  style={[
                    !darkMode && shadowBoxDark,
                    {
                      backgroundColor: darkMode ? "#0f0f0f" : "white",
                    },
                  ]}
                  onPress={() => navigation.navigate("EditListing")}
                  className="bg-[#0F0F0F] py-2 px-3 w-auto flex-row justify-between items-center rounded-lg"
                >
                  <AntDesign name="edit" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[13px] w- pl-1">
                    Edit
                  </SmallText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    !darkMode && shadowBoxDark,
                    {
                      backgroundColor: darkMode ? "#0f0f0f" : "white",
                    },
                  ]}
                  className="bg-[#0F0F0F] py-2 px-3 w-auto flex-row justify-between items-center rounded-lg"
                >
                  <AntDesign name="delete" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[13px] pl-1">
                    Delete
                  </SmallText>
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
          ListFooterComponent={
            <View className="px-3">
              <Spacer value={H("6%")} axis="vertical" />
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="text-[#D4E1D2] text-[20px] text-left p-0"
              >
                Details
              </SmallText>
              <Spacer value={H("4%")} axis="vertical" />
              <View className="flex-row justify-between items-center mb-3">
                <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[30%]">
                  Category
                </SmallText>
                <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[60%]">
                  Fashion
                </SmallText>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[30%]">
                  Location
                </SmallText>
                <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[60%]">
                  14 Rumuokoro, PH, Nigeria
                </SmallText>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[30%]">
                  Status
                </SmallText>
                <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[60%]">
                  Active
                </SmallText>
              </View>
              <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[100%] mb-3">
                Brand Logo
              </SmallText>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
                }}
                alt="logo"
                className="w-[150px] h-[130px] rounded-xl "
              />
              <Spacer value={H("4%")} axis="vertical" />
            </View>
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyListing;
