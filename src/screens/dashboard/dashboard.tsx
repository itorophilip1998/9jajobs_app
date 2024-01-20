import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryText, SmallText, Spacer, Title } from "../../components";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import CategoryCard from "../../components/categoryCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import SliderIcon from "../../components/sliderIcon";
import UserCard from "../../components/userCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { SET_TYPE } from "../../store/searchSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import NearUserCard from "../../components/nearUserCard";
import { SET_LOADER } from "../../store/formDataSlice";
import {
  getAllListing,
  getCategories,
  getCategoryListing,
} from "../../api/category";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

const Dashboard = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const [category, setCategory] = React.useState<any[]>([]);
  const [nearest, setNearest] = React.useState<any>(null);
  const [trending, setTrending] = React.useState<any>(null);
  const { location, search } = useSelector((state: RootState) => state.search);
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getCategoryListing(
        (response) => {
          setCategory(response);
          dispatch(SET_LOADER(false));
        },
        (error) => {
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    }
  }, [focus]);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getAllListing(
        {
          is_trending: true,
        },
        (response) => {
          setTrending(response.listing);
          dispatch(SET_LOADER(false));
        },
        (error) => {
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    }
  }, [focus]);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getAllListing(
        {
          listing_city: profile?.city || "",
          is_nearest: true,
        },
        (response) => {
          setNearest(response.listing);
          dispatch(SET_LOADER(false));
        },
        (error) => {
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    }
  }, [focus]);
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
          <GradientText
            style={{ fontSize: W("6.5%") }}
            className="!text-[#626262] font-RedHatDisplaySemiBold mt-3"
          >
            What are you looking for?
          </GradientText>
          <Spacer axis="vertical" value={H(3)} />
          <View className="w-full flex-row items-center justify-between">
            <Pressable
              onPress={() => {
                dispatch(SET_TYPE("name"));
                navigation.navigate("Search");
              }}
              style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
              className="w-[66%] px-3 py-2 border border-primary rounded-full flex-row items-center"
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
                {search === "" ? "Search here" : search}
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
                numberOfLine={1}
                style={{ color: darkMode ? "#D4E1D2" : "#696969" }}
                className="text-[#D4E1D2] text-left p-0 pr-2 w-[90%]"
              >
                {location === "" ? "Location" : location}
              </SmallText>
              <AntDesign name="downcircleo" size={13} color={COLORS.primary} />
            </Pressable>
            {/* <SliderIcon onPress={() => navigation.navigate("Filter")} /> */}
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
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={category.filter((_item, idx) => idx < 6)}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              numColumns={3}
              ItemSeparatorComponent={() => (
                <Spacer value={H("1%")} axis="vertical" />
              )}
              renderItem={({ item }) => (
                <CategoryCard
                  onPress={() =>
                    navigation.navigate("Freelancers", { data: item })
                  }
                  item={item}
                  color={darkMode ? "#0F0F0F" : "#D4E1D2"}
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Category", { data: category })}
            className="flex-row items-center mx-auto"
          >
            <Entypo
              name="chevron-small-down"
              size={24}
              color={darkMode ? "#D4E1D2" : "#0F0F0F"}
            />
            <SmallText
              className="text-center text-primary p-0"
              style={!darkMode && { color: !darkMode ? "#0F0F0F" : undefined }}
            >
              See More
            </SmallText>
          </TouchableOpacity>
          <Spacer axis="vertical" value={H(3)} />
          <View className="w-full flex-row justify-between items-center">
            {darkMode ? (
              <SmallText className="!text-white p-0 text-left font-RedHatDisplaySemiBold text-[20px]">
                Trending
              </SmallText>
            ) : (
              <GradientText className="!text-[#626262] text-[20px] font-RedHatDisplaySemiBold mt-3">
                Trending
              </GradientText>
            )}
            <Pressable onPress={() => navigation.navigate("TrendingListing")}>
              <GradientText className="!text-[#626262] text-[15px] font-RedHatDisplayMedium mt-3">
                View All
              </GradientText>
            </Pressable>
          </View>
          <Spacer axis="vertical" value={H(3)} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={trending?.data.filter((_item: any, idx: number) => idx < 10)}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("1%")} axis="horizontal" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[220px] py-1 px-1"
                onPress={() =>
                  navigation.navigate("FreelancerProfile", { data: item })
                }
              >
                <UserCard item={item} />
              </Pressable>
            )}
          />
          <Spacer axis="vertical" value={H(3)} />
          <View className="w-full flex-row justify-between items-center">
            {darkMode ? (
              <SmallText className="!text-white p-0 text-left font-RedHatDisplaySemiBold text-[20px]">
                Nearest Listing
              </SmallText>
            ) : (
              <GradientText className="!text-[#626262] text-[20px] font-RedHatDisplaySemiBold mt-3">
                Nearest Listing
              </GradientText>
            )}
            <Pressable onPress={() => navigation.navigate("NearestListing")}>
              <GradientText className="!text-[#626262] text-[15px] font-RedHatDisplayMedium">
                View All
              </GradientText>
            </Pressable>
          </View>

          <Spacer axis="vertical" value={H(3)} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={nearest?.data.filter((_item: any, idx: number) => idx < 10)}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("1%")} axis="horizontal" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[260px] py-1 px-1"
                onPress={() =>
                  navigation.navigate("FreelancerProfile", { data: item })
                }
              >
                <NearUserCard item={item} />
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
