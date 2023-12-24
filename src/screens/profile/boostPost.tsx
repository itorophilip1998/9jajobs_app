import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { getUserListing } from "../../api/category";
import { SET_LOADER } from "../../store/formDataSlice";

const BoostPost = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [listings, setListings] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [loaded, setLoaded] = React.useState<boolean>(false);
  //   const sortRef = React.useState<RBSheet | null>(null);

  const handleSearch = () => {
    setLoaded(true);
    dispatch(SET_LOADER(true));
    getUserListing(
      {
        listing_name: search,
      },
      (response) => {
        setLoaded(true);
        dispatch(SET_LOADER(false));
        setListings(response);
      },
      (error) => {
        setLoaded(true);
        dispatch(SET_LOADER(false));
        Toast.show({
          type: "error",
          text1: error,
        });
      }
    );
  };

  React.useEffect(() => {
    if (focus) handleSearch();
  }, [focus]);
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
      <SafeAreaView className="flex-1 w-full h-full">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full bg-[#0f0f0f] justify-between px-3 py-4"
        >
          <View className="flex-row items-center w-[88%]">
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
          {/* <TouchableOpacity className="bg-transparent py-2 px-4 w-auto justify-center items-center rounded-full">
            {darkMode ? (
              <SmallText className="text-white p-0 text-[15px] pl-1">
                Sort by
              </SmallText>
            ) : (
              <GradientText className="text-white p-0 text-[15px] pl-1 font-RedHatDisplayRegular">
                Sort by
              </GradientText>
            )}
          </TouchableOpacity> */}
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View className="px-3 flex-row justify-between items-center">
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
            className="text-[#696969] text-[20px] text-left p-0"
          >
            Listed posts
          </SmallText>
          {/* <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
            className="text-[#696969] text-[20px] text-left p-0"
          >
            ₦2,000/Year
          </SmallText> */}
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <FlatList
          className="px-3 flex-1"
          showsVerticalScrollIndicator={false}
          data={listings
            .filter((item) => item?.boosting?.status !== "active")
            .filter((item) =>
              item.listing_name.toLowerCase().includes(search.toLowerCase())
            )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            loaded ? (
              <>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{ height: H("71%") }}
                >
                  <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                    Oops! No Listings Found
                  </GradientText>
                  <Spacer value={H("2%")} axis="vertical" />
                  <Button
                    text="Back to Menu"
                    onPress={() => navigation.navigate("Profile")}
                    buttonStyleClassName="rounded-md"
                  />
                </View>
              </>
            ) : null
          }
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
                {item.listing_name}
              </SmallText>
              <Button
                onPress={() =>
                  navigation.navigate("BoostDetail", { data: item })
                }
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
