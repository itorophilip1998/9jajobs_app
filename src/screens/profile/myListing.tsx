import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SmallText, Spacer, Button } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
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
import { deleteListing, renewListing } from "../../api/listings";
import { GradientText } from "../../components/gradientText";
import ErrorVerifyModalContent from "../../components/errorVerifyModalContent";
import { DelayFor } from "../../utility/helpers";
import { getWalletDetails } from "../../api/wallet";

const MyListing = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const [listings, setListings] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any>(null);
  const [search, setSearch] = React.useState<string>("");
  const [listing_id, setListingId] = React.useState<any>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const [rating, setRating] = React.useState<any[]>([]);

  const { loggedIn, access_token, darkMode, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const [walletDetails, setWalletDetails] = React.useState<any>(null);

  React.useEffect(() => {
    if (focus) {
      if (!Boolean(loggedIn && access_token)) {
        navigation.navigate("Signin", { two_step: true });
      } else {
        dispatch(SET_LOADER(true));
        getWalletDetails(
          null,
          (response) => {
            setWalletDetails(response);
            getUserListing(
              {
                listing_name: search,
              },
              (response) => {
                dispatch(SET_LOADER(false));
                setListings(response);
                setLoaded(true);
              },
              (error) => {
                dispatch(SET_LOADER(false));
                setLoaded(true);
                Toast.show({
                  type: "error",
                  text1: error,
                });
              }
            );
          },
          (error) => {
            Toast.show({
              type: "error",
              text1: error,
            });
            dispatch(SET_LOADER(false));
          }
        );
      }
    }
  }, [focus, loggedIn, access_token]);

  console.log(listings)

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

  const reactivate = (id: string, amount: string) => {
    dispatch(SET_LOADER(true));
    renewListing(
      { listing_id: id, listing_creation_amount: amount },
      (response) => {
        getUserListing(
          {
            listing_name: search,
          },
          (response1) => {
            dispatch(SET_LOADER(false));
            Toast.show({
              type: "success",
              text1: response.message,
            });
            setListings(response1);
          },
          (error) => {
            dispatch(SET_LOADER(false));
            Toast.show({
              type: "error",
              text1: error,
            });
          }
        );
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
              <Spacer value={H("2%")} axis="vertical" />
              <View className="px-3 flex-row justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-[#696969] text-[20px] text-center p-0 w-[50%]"
                >
                  My Services
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-[#696969] text-[20px] text-center p-0 w-[50%]"
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
          ListEmptyComponent={
            loaded ? (
              <>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{ height: H("71%") }}
                >
                  <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                    Oops! No Listing Found
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
                className="text-[#D4E1D2] text-[19px] flex-1 text-left p-0"
              >
                {item.listing_name}
              </SmallText>
              <View className=" flex-row justify-between items-center">
                {item?.listing_subscription?.status !== "active" && (
                  <TouchableOpacity
                    style={[
                      !darkMode && shadowBoxDark,
                      {
                        backgroundColor: darkMode ? "#0f0f0f" : "white",
                      },
                    ]}
                    onPress={() =>
                      walletDetails?.balance >
                      item?.listing_subscription?.amount
                        ? reactivate(
                            item.id,
                            item?.listing_subscription?.amount ||
                              profile?.listing_creation_amount
                          )
                        : navigation.navigate("Paystack", {
                            amount: profile?.listing_creation_amount || 0,
                            callback: () =>
                              reactivate(
                                item.id,
                                item?.listing_subscription?.amount ||
                                  profile?.listing_creation_amount
                              ),
                          })
                    }
                    className="bg-[#0F0F0F] py-2 px-3 w-auto flex-row justify-between items-center rounded-lg"
                  >
                    <MaterialIcons
                      name="autorenew"
                      size={15}
                      color={COLORS.primary}
                    />
                    <SmallText className="text-primary p-0 text-[13px] pl-1">
                      Renew
                    </SmallText>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    !darkMode && shadowBoxDark,
                    {
                      backgroundColor: darkMode ? "#0f0f0f" : "white",
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate("EditListing", { data: item })
                  }
                  className="bg-[#0F0F0F] py-2 px-3 w-auto flex-row justify-between items-center rounded-lg ml-2"
                >
                  <AntDesign name="edit" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[13px] pl-1">
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
                  className="bg-[#0F0F0F] py-2 px-3 w-auto flex-row justify-between items-center rounded-lg ml-2"
                  onPress={() => {
                    setListingId(item);
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
      <ErrorVerifyModalContent
        message={{
          title: "Confirm",
          message: "Are you sure you want to delete this listing?",
        }}
        visible={Boolean(listing_id)}
        icon={<AntDesign name="warning" size={24} color={COLORS.danger} />}
      >
        <View className="flex-row justify-between items-center">
          <Button
            text="Yes"
            buttonStyle={{ width: W("36%"), marginRight: W("3%") }}
            // buttonStyleClassName="bg-[#C93636]"
            onPress={() => {
              setListingId(null);
              DelayFor(500, () => {
                dispatch(SET_LOADER(true));
                deleteListing(
                  { id: listing_id.id },
                  (response) => {
                    setListings(
                      listings.filter((data) => data.id !== listing_id.id)
                    );
                    dispatch(SET_LOADER(false));
                  },
                  (error) => {
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                    dispatch(SET_LOADER(false));
                  }
                );
              });
            }}
          />
          <Button
            text="No"
            buttonStyle={{ width: W("36%") }}
            // buttonStyleClassName="bg-transparent border border-[#C3B9B9]"
            // textStyleClassName="text-[#212121]"
            onPress={() => setListingId(null)}
          />
        </View>
      </ErrorVerifyModalContent>
    </KeyboardAvoidingView>
  );
};

export default MyListing;
