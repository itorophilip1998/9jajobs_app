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

const Dashboard = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { location, search } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 bg-black px-3">
          <Title className="!text-[#626262] font-RedHatDisplaySemiBold mt-3">
            Welcome dear, what are you looking for
          </Title>
          <Spacer axis="vertical" value={H(3)} />
          <View className="w-full flex-row items-center justify-between">
            <Pressable
              onPress={() => {
                dispatch(SET_TYPE("name"));
                navigation.navigate("Search");
              }}
              className="w-[58%] px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row items-center"
            >
              <AntDesign name="search1" size={24} color="#D4E1D2" />
              <SmallText className="text-[#D4E1D2] text-left p-0 pl-3">
                {/* {search === "" ? "Search here" : search} */}
                Search here
              </SmallText>
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch(SET_TYPE("name"));
                navigation.navigate("Search");
              }}
              className="w-[30%] px-3 py-3 bg-[#1b1b1b] rounded-full flex-row items-center justify-between"
            >
              <SmallText className="text-[#D4E1D2] text-left p-0 pr-2">
                {/* {location === "" ? "Location" : location} */}
                Location
              </SmallText>
              <AntDesign name="downcircleo" size={13} color={COLORS.primary} />
            </Pressable>
            <SliderIcon onPress={() => navigation.navigate("Filter")} />
          </View>
          <Spacer axis="vertical" value={H(3)} />
          <SmallText className="!text-white p-0 text-left text-[18px]">
            Categories
          </SmallText>
          <Spacer axis="vertical" value={H(3)} />
          <View className="flex-row justify-between flex-wrap">
            {CATEGORIES.filter((_item, idx) => idx !== 6).map((item) => (
              <CategoryCard
                onPress={() => navigation.navigate("Freelancers")}
                key={item.id.toString()}
                item={item}
              />
            ))}
          </View>
          <PrimaryText
            onPress={() => navigation.navigate("Category")}
            className="text-center"
          >
            See More
          </PrimaryText>
          <Spacer axis="vertical" value={H(3)} />
          <SmallText className="!text-white p-0 text-left text-[18px]">
            Trending
          </SmallText>
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
                className="w-[220px]"
                onPress={() => navigation.navigate("FreelancerProfile")}
              >
                <UserCard item={item} />
              </Pressable>
            )}
          />
          <Spacer axis="vertical" value={H(3)} />
          <SmallText className="!text-white p-0 text-left text-[18px]">
            Nearest Listing
          </SmallText>
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
                className="w-[220px]"
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
