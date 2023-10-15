import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryText, SmallText, Spacer, Title } from "../../components";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { CATEGORIES } from "../../data/category";
import CategoryCard from "../../components/categoryCard";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import SliderIcon from "../../components/sliderIcon";
import { MAIN_USERS, SPONSORED_MAIN_USERS } from "../../data/listing";
import UserCard from "../../components/userCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SET_TYPE } from "../../store/searchSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";

const Dashboard = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { location, search } = useSelector((state: RootState) => state.search);
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <View
      className="flex-1 bg-black"
      style={{ backgroundColor: darkMode ? "black" : "white" }}
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 bg-black px-3"
          style={{ backgroundColor: darkMode ? "black" : "white" }}
        >
          {darkMode ? (
            <Title className="!text-[#626262] font-RedHatDisplaySemiBold mt-3">
             What are you looking for
            </Title>
          ) : (
            <GradientText className="!text-[#626262] text-[27px] font-RedHatDisplaySemiBold mt-3">
              What are you looking for
            </GradientText>
          )}

          <Spacer axis="vertical" value={H(3)} />
          <View className="w-full flex-row items-center justify-between">
            <Pressable
              onPress={() => {
                dispatch(SET_TYPE("name"));
                navigation.navigate("Search");
              }}
              style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
              className="w-[58%] px-3 py-2 border border-primary rounded-full flex-row items-center"
            >
              <AntDesign
                name="search1"
                size={24}
                color={darkMode ? "#D4E1D2" : "#696969"}
              />
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 pl-3"
              >
                {/* {search === "" ? "Search here" : search} */}
                Search here
              </SmallText>
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch(SET_TYPE("name"));
                navigation.navigate("Search");
              }}
              style={{
                backgroundColor: darkMode ? "#1b1b1b" : "transparent",
                borderWidth: darkMode ? 0 : 1,
                borderColor: COLORS.primary,
              }}
              className="w-[30%] px-3 py-3 bg-[#1b1b1b] rounded-full flex-row items-center justify-between"
            >
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#696969" }}
                className="text-[#D4E1D2] text-left p-0 pr-2"
              >
                {/* {location === "" ? "Location" : location} */}
                Location
              </SmallText>
              <AntDesign name="downcircleo" size={13} color={COLORS.primary} />
            </Pressable>
            <SliderIcon onPress={() => navigation.navigate("Filter")} />
          </View>
          <Spacer axis="vertical" value={H(3)} />
          {darkMode ? (
            <SmallText className="!text-white p-0 text-left font-RedHatDisplaySemiBold text-[20px]">
              Categories
            </SmallText>
          ) : (
            <GradientText className="!text-[#626262] text-[20px] font-RedHatDisplaySemiBold mt-3">
              Categories
            </GradientText>
          )}

          <Spacer axis="vertical" value={H(3)} />
          <View className="flex-row justify-between flex-wrap">
            {CATEGORIES.filter((_item, idx) => idx !== 6).map((item) => (
              <CategoryCard
                onPress={() => navigation.navigate("Freelancers")}
                key={item.id.toString()}
                item={item}
                color={darkMode ? "#0F0F0F" : "#D4E1D2"}
              />
            ))}
          </View>
          <PrimaryText
            onPress={() => navigation.navigate("Category")}
            className="text-center"
            style={!darkMode && { color: !darkMode && "#0F0F0F" }}
          >
            See More
          </PrimaryText>
          <Spacer axis="vertical" value={H(3)} />
          {darkMode ? (
            <SmallText className="!text-white p-0 text-left font-RedHatDisplaySemiBold text-[20px]">
              Trending
            </SmallText>
          ) : (
            <GradientText className="!text-[#626262] text-[20px] font-RedHatDisplaySemiBold mt-3">
              Trending
            </GradientText>
          )}
          <Spacer axis="vertical" value={H(3)} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={SPONSORED_MAIN_USERS}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="horizontal" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[220px] py-1 px-1"
                onPress={() => navigation.navigate("FreelancerProfile")}
              >
                <UserCard item={item} />
              </Pressable>
            )}
          />
          <Spacer axis="vertical" value={H(3)} />
          {darkMode ? (
            <SmallText className="!text-white p-0 text-left font-RedHatDisplaySemiBold text-[20px]">
              Nearest Listing
            </SmallText>
          ) : (
            <GradientText className="!text-[#626262] text-[20px] font-RedHatDisplaySemiBold mt-3">
              Nearest Listing
            </GradientText>
          )}
          <Spacer axis="vertical" value={H(3)} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={MAIN_USERS}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="horizontal" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[220px] py-1 px-1"
                onPress={() => navigation.navigate("FreelancerProfile")}
              >
                <UserCard item={item} />
              </Pressable>
            )}
          />
          <Spacer axis="vertical" value={H(3)} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Dashboard;
