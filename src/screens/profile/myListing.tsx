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
import { COLORS } from "../../utility/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { shadowBoxDark } from "../../style/Typography";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { getUserListing } from "../../api/category";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import userImg from "../../../assets/images/user.jpg";
import { getRating } from "../../api/rating";
import ReviewCard from "../../components/reviewCard";
import { deleteListing } from "../../api/listings";

const MyListing = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [listings, setListings] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any>(null);
  const [search, setSearch] = React.useState<string>("");

  const [rating, setRating] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (focus && details?.id) {
      dispatch(SET_LOADER(true));
      getRating(
        details?.id,
        (response) => {
          setRating(response);
          dispatch(SET_LOADER(false));
        },
        (error) => {
          dispatch(SET_LOADER(false));
          Toast.show({ type: "error", text1: error });
        }
      );
    }
  }, [details?.id, focus]);

  const handleSearch = () => {
    dispatch(SET_LOADER(true));
    getUserListing(
      {
        listing_name: search,
      },
      (response) => {
        dispatch(SET_LOADER(false));
        setListings(response);
      },
      (error) => {
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
      <SafeAreaView className="flex-1 w-full">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full bg-[#0f0f0f] justify-between px-3 py-4"
        >
          <View className="flex-row items-center w-[95%]">
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
                className={`h-full flex-1 px-2 text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
                onChangeText={(value) => setSearch(value)}
                value={search}
                // onFocus={() => {
                //   onFocus && onFocus();
                // }}
                // onBlur={() => {
                //   handleSearch();
                // }}
                placeholderTextColor={"#626262"}
                placeholder={"Search here"}
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                autoCapitalize={"none"}
              />
            </Pressable>
          </View>
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
          data={listings.filter((item) =>
            item.listing_name.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{ borderBottomColor: darkMode ? "#0f0f0f" : "#696969" }}
              className="border-b-[1px] border-b-[#0f0f0f]"
            />
          )}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setDetails(item)}
              style={{
                backgroundColor:
                  item.id.toString() === details?.id.toString()
                    ? "#023215"
                    : "transparent",
              }}
              className="flex-row px-3 justify-between items-center w-full py-2"
            >
              <SmallText
                style={{
                  color:
                    item.id.toString() === details?.id.toString()
                      ? "#D4E1D2"
                      : "#696969",
                }}
                numberOfLine={1}
                className="text-[#D4E1D2] text-[19px] w-[45%] text-left p-0"
              >
                {item.listing_name}
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
                  onPress={() => {
                    dispatch(SET_LOADER(true));
                    deleteListing(
                      { id: item.id },
                      (response) => {
                        setListings(
                          listings.filter((data) => data.id === item.id)
                        );
                        dispatch(SET_LOADER(false));
                        Toast.show({
                          type: "success",
                          text1: response.message,
                        });
                      },
                      (error) => {
                        Toast.show({
                          type: "error",
                          text1: error,
                        });
                        dispatch(SET_LOADER(false));
                      }
                    );
                  }}
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
            <>
              {details && (
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
                      {details?.r_listing_category?.listing_category_name}
                    </SmallText>
                  </View>
                  <View className="flex-row justify-between items-center mb-3">
                    <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[30%]">
                      Location
                    </SmallText>
                    <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[60%]">
                      {details?.listing_address}
                    </SmallText>
                  </View>
                  <View className="flex-row justify-between items-center mb-3">
                    <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[30%]">
                      Status
                    </SmallText>
                    <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[60%]">
                      {details?.listing_status}
                    </SmallText>
                  </View>
                  <SmallText className="text-[#696969] text-[16px] text-left p-0 w-[100%] mb-3">
                    Brand Logo
                  </SmallText>
                  <Image
                    source={
                      details?.listing_featured_photo &&
                      details?.listing_featured_photo.length > 0
                        ? {
                            uri: details?.listing_featured_photo,
                          }
                        : userImg
                    }
                    alt="logo"
                    className="w-[150px] h-[130px] rounded-xl "
                  />
                  <Spacer value={H("3%")} axis="vertical" />
                </View>
              )}
              <View className="px-3">
                {rating.map((item: any, idx: number) => (
                  <>
                    <ReviewCard item={item} key={idx} />
                    <Spacer key={idx + 1} value={H("3%")} axis="vertical" />
                  </>
                ))}
              </View>
            </>
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyListing;
