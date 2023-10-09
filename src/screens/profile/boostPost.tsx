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

const BoostPost = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [search, setSearch] = React.useState<string>("");
  //   const sortRef = React.useState<RBSheet | null>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <View className="relative flex flex-row items-center w-full bg-[#0f0f0f] justify-between px-3 py-4">
          <View className="flex-row items-center w-[65%]">
            <Pressable onPress={() => navigation.goBack()} className="mr-3">
              <Feather name="arrow-left-circle" size={30} color={"#696969"} />
            </Pressable>
            <Pressable className="w-[90%] px-3 py-2 border bg-[#1b1b1b] border-[#696969] focus:border-primary rounded-full flex-row justify-between items-center">
              <AntDesign name="search1" size={20} color="#696969" />
              <TextInput
                keyboardType={"web-search"}
                className={`h-full w-[90%] text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
                onChangeText={(value) => setSearch(value)}
                value={search}
                placeholderTextColor={"#D4E1D2"}
                placeholder={"Search here"}
                autoCapitalize={"none"}
              />
            </Pressable>
          </View>
          <TouchableOpacity className="bg-transparent py-2 px-4 w-auto justify-center items-center rounded-full">
            <SmallText className="text-white p-0 text-[15px] pl-1">
              Sort by
            </SmallText>
          </TouchableOpacity>
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <SmallText className="text-[#696969] text-[20px] text-left p-0 px-3">
          Listed posts
        </SmallText>
        <Spacer value={H("3%")} axis="vertical" />
        <FlatList
          className="px-3 flex-1"
          showsVerticalScrollIndicator={false}
          data={MAIN_USERS}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View className="border-b-[2px] border-b-[#0f0f0f]" />
          )}
          renderItem={({ item }) => (
            <Pressable className="flex-row justify-between items-center w-full py-3">
              <SmallText className="text-[#D4E1D2] text-[19px] text-left p-0">
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
