import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { InputField, PrimaryText, SmallText, Spacer } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { SET_SEARCH } from "../../store/searchSlice";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { MESSAGES } from "../../data/messages";
import UserProfileCard from "../../components/userProfileCard";
import navigation from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";

const MessageSection = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [status, setStatus] = React.useState<"all" | "unread" | "spam">("all");
  const [search, setSearch] = React.useState<string>("");
  const {darkMode} = useSelector((state: RootState) => state.auth)
  return (
    <View className="flex-1">
      <View
        style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
        className="w-[93%] mx-auto px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row justify-between items-center"
      >
        <AntDesign
          name="search1"
          size={20}
          color={darkMode ? "#D4E1D2" : "#696969"}
        />
        <TextInput
          keyboardType={"web-search"}
          className={`h-full w-[90%] text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
          onChangeText={(value) => setSearch(value)}
          value={search}
          // onFocus={() => {
          //   onFocus && onFocus();
          // }}
          // onBlur={() => {
          //   onBlur && onBlur();
          // }}
          placeholderTextColor={"#626262"}
          placeholder={"Search for Category"}
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
          autoCapitalize={"none"}
        />
      </View>
      <View className="flex-row justify-between items-center w-[70%] mx-auto my-3 px-3">
        <PrimaryText
          onPress={() => setStatus("all")}
          style={{ color: status === "all" ? "#1A911B" : "#696969" }}
          className="mx-2"
        >
          All
        </PrimaryText>
        <PrimaryText
          onPress={() => setStatus("unread")}
          style={{ color: status === "unread" ? "#1A911B" : "#696969" }}
          className="mx-2"
        >
          Unread
        </PrimaryText>
        <PrimaryText
          onPress={() => setStatus("spam")}
          style={{ color: status === "spam" ? "#1A911B" : "#696969" }}
          className="mx-2"
        >
          Spam
        </PrimaryText>
      </View>
      <FlatList
        className="flex-1"
        showsVerticalScrollIndicator={false}
        data={MESSAGES}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <Spacer value={H("3%")} axis="vertical" />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
            style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
            className="bg-[#0F0F0F] py-2 px-3 flex-row justify-between"
          >
            <View className="w-[50%] flex-row items-center">
              <Image
                source={{ uri: item.image }}
                alt=""
                className="w-[60px] h-[60px] rounded-full mr-3"
              />
              <View className="h-[60px] justify-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-[#D4E1D2] text-left p-0 text-[18px] mb-1"
                >
                  {item.name}
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-left p-0 text-[14px] text-[#696969]"
                >
                  {item.lastMessage}
                </SmallText>
              </View>
            </View>
            <View className="h-[60px] justify-center items-end">
              <SmallText className="text-right p-0 text-[14px] text-[#696969] mb-2">
                {item.date}
              </SmallText>
              {!item.read && (
                <GradientText className="text-primary font-RedHatDisplayRegular text-right p-0 text-[14px]">
                  New
                </GradientText>
              )}

              {/* <View className="w-[10px] h-[10px] rounded-full bg-primary"/> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessageSection;
