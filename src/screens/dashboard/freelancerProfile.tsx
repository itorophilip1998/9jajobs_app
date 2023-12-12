import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  BottomSheet,
  Button,
  InputField,
  PrimaryText,
  SmallText,
  Spacer,
} from "../../components";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import {
  DelayFor,
  FirstLetterUppercase,
  isValidDate,
  validatePhone,
} from "../../utility/helpers";
import Checkbox from "expo-checkbox";
import VideoCard from "../../components/videoCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import { shadowBox, shadowBoxDark } from "../../style/Typography";
import map from "../../../assets/images/map.png";
import Facebook from "../../../assets/icons/facebook.svg";
import Instagram from "../../../assets/icons/instagram.svg";
import Whatsapp from "../../../assets/icons/whatsapp.svg";
import Linkedin from "../../../assets/icons/linkedin.svg";
import Twitter from "../../../assets/icons/twitter.svg";
import { RouteProp } from "@react-navigation/native";
import userImg from "../../../assets/images/user.jpg";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { getRating } from "../../api/rating";
import Toast from "react-native-toast-message";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { bookListing } from "../../api/booking";

const FreelancerProfile = ({
  navigation,
  route,
}: {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const { darkMode, loggedIn, access_token } = useSelector(
    (state: RootState) => state.auth
  );
  const [amenities, setAmenities] = React.useState<any[]>([]);

  const bookRef = React.useRef<RBSheet | null>(null);
  const [day, setDay] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");

  const [hour, setHour] = React.useState<string>("");
  const [minutes, setMinutes] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-4"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "white",
      }}
    >
      <SafeAreaView className="flex-1 w-full pt-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleWithButton title="" fire={() => navigation.goBack()} />
          <View
            style={{
              shadowColor: "#969191", // Shadow color
              shadowOffset: { width: 0, height: 3 }, // Shadow offset
              shadowOpacity: 0.4, // Shadow opacity
              shadowRadius: 15, // Shadow radius
              elevation: 5,
            }}
            className="w-[270px] h-[270px] rounded-full mx-auto bg-[#0f0f0f]"
          >
            <Image
              source={
                route.params?.data?.listing_featured_photo &&
                route.params?.data?.listing_featured_photo.length > 0
                  ? {
                      uri: route.params?.data?.listing_featured_photo,
                    }
                  : userImg
              }
              alt=""
              className="w-full h-full rounded-full"
            />
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="flex-row items-center justify-between mt-2 w-full">
            <View className="w-[50%]">
              <View className="flex-row items-center mb-1 w-full pr-3">
                {darkMode ? (
                  <SmallText
                    numberOfLine={1}
                    className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplaySemiBold"
                  >
                    {FirstLetterUppercase(
                      route.params?.data?.listing_name || ""
                    )}
                  </SmallText>
                ) : (
                  <GradientText
                    numberOfLines={1}
                    className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplaySemiBold"
                  >
                    {FirstLetterUppercase(
                      route.params?.data?.listing_name || ""
                    )}
                  </GradientText>
                )}
                {route.params?.data.verified &&
                  route.params?.data.verified?.status === "completed" && (
                    <MaterialIcons
                      name="verified"
                      size={18}
                      color={COLORS.primary}
                    />
                  )}
              </View>
              <Spacer value={H("0.5%")} axis="vertical" />
              <View className="flex-row justify-between items-center mb-1 w-full">
                <SmallText
                  numberOfLine={1}
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#D4E1D2] text-left p-0 text-[15px] w-[75%]"
                >
                  {FirstLetterUppercase(
                    route.params?.data?.r_listing_category
                      ?.listing_category_name || ""
                  )}
                </SmallText>
                <View className="flex-row items-center">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[15px] pl-1">
                    {route.params?.data.rate_star}
                  </SmallText>
                </View>
              </View>
              {/* <Spacer value={H("1%")} axis="vertical" />
              <View className="flex-row justify-between items-center mb-1 w-full">
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
             {FirstLetterUppercase("1.2 Km Away")} 
                </SmallText>

                <View className="flex-row items-center">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[15px] pl-1">
                    4.2
                  </SmallText>
                </View>
              </View> */}
            </View>
            <View className="flex-row items-center justify-end w-[45%]">
              <TouchableOpacity
                className="items-center"
                onPress={() =>
                  route.params?.data?.user
                    ? navigation.navigate("Chat", {
                        data: route.params?.data?.user,
                      })
                    : Toast.show({
                        type: "error",
                        text1: "This listing does not have a user.",
                      })
                }
              >
                <View
                  style={
                    !darkMode
                      ? { ...shadowBoxDark, backgroundColor: "white" }
                      : { ...shadowBox, backgroundColor: "#0f0f0f" }
                  }
                  className="p-2 rounded-full bg-[#121212] mb-2"
                >
                  <Ionicons
                    name="md-chatbox-ellipses-outline"
                    size={23}
                    color={COLORS.primary}
                  />
                </View>
                <SmallText className="text-primary text-left p-0 text-[15px]">
                  Chat
                </SmallText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  !route.params?.data?.listing_phone &&
                  !route.params?.data?.user?.phone
                    ? Toast.show({
                        type: "error",
                        text1: "This listing does not have a phone number.",
                      })
                    : !validatePhone(route.params?.data?.listing_phone, 11) ||
                      !validatePhone(route.params?.data?.user?.phone, 11)
                    ? Toast.show({
                        type: "error",
                        text1: "Invalid phone number.",
                      })
                    : Linking.openURL(
                        `tel:${
                          route.params?.data?.listing_phone ||
                          route.params?.data?.user?.phone ||
                          ""
                        }`
                      )
                }
                className="items-center mx-4"
              >
                <View
                  style={
                    !darkMode
                      ? { ...shadowBoxDark, backgroundColor: "white" }
                      : { ...shadowBox, backgroundColor: "#0f0f0f" }
                  }
                  className="p-2 rounded-full bg-[#121212] mb-2"
                >
                  <Ionicons name="call" size={23} color={COLORS.primary} />
                </View>
                <SmallText className="text-primary text-left p-0 text-[15px]">
                  Call
                </SmallText>
              </TouchableOpacity>

              <TouchableOpacity
                className="items-center"
                onPress={() =>
                  navigation.navigate("Report", { data: route.params?.data })
                }
              >
                <View
                  style={
                    !darkMode
                      ? { ...shadowBoxDark, backgroundColor: "white" }
                      : { ...shadowBox, backgroundColor: "#0f0f0f" }
                  }
                  className="p-2 rounded-full bg-[#121212] mb-2"
                >
                  <AntDesign
                    name="exclamationcircleo"
                    size={23}
                    color={COLORS.primary}
                  />
                </View>
                <SmallText className="text-primary text-left p-0 text-[15px]">
                  Report
                </SmallText>
              </TouchableOpacity>
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
          >
            About
          </SmallText>
          <Spacer value={H("2%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[15px] font-RedHatDisplayRegular"
          >
            {route.params?.data?.listing_description?.replaceAll(
              /<\/?[^>]+(>|$)/gi,
              ""
            )}
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
          {route.params?.data?.listings_photos.length > 0 && (
            <>
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
              >
                Photos
              </SmallText>
              <Spacer value={H("3%")} axis="vertical" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params?.data?.listings_photos.map(
                  (item: any, idx: number) => (
                    <>
                      <Image
                        key={idx}
                        source={{
                          uri: item.photo,
                        }}
                        alt=""
                        className="w-[150px] h-[100px] rounded-lg"
                      />
                      <Spacer value={W("5%")} axis="horizontal" key={idx + 1} />
                    </>
                  )
                )}
              </ScrollView>
              <Spacer value={H("3%")} axis="vertical" />
            </>
          )}
          {route.params?.data?.listings_videos.length > 0 && (
            <>
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[19px] font-RedHatDisplaySemiBold"
              >
                Videos
              </SmallText>
              <Spacer value={H("3%")} axis="vertical" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params?.data?.listings_photos.map(
                  (item: any, idx: number) => (
                    <>
                      <VideoCard item={item} />
                      <Spacer value={W("5%")} axis="horizontal" key={idx + 1} />
                    </>
                  )
                )}
              </ScrollView>
              <Spacer value={H("3%")} axis="vertical" />
            </>
          )}
          <View className="w-full flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Octicons name="megaphone" size={28} color={COLORS.primary} />
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold"
              >
                Amenities
              </SmallText>
            </View>
            <PrimaryText
              onPress={() =>
                navigation.navigate("Reviews", { data: route.params?.data })
              }
            >
              See Reviews
            </PrimaryText>
          </View>
          <Spacer value={H("1%")} axis="vertical" />
          {route.params?.data?.amenities.map((item: any, idx: number) => (
            <>
              <Spacer value={H("2%")} axis="vertical" />
              <View className=" flex-row items-center">
                <Checkbox
                  color={"#1A911B"}
                  value={amenities.some((data: any) => data.id === item.id)}
                  onValueChange={() => {
                    const isItemInArray = amenities.some(
                      (obj) => obj.id === item.id
                    );

                    if (isItemInArray) {
                      setAmenities((prev: any) =>
                        prev.filter((obj: any) => item.id !== obj.id)
                      );
                    } else {
                      setAmenities((prev: any) => [...prev, item]);
                    }
                  }}
                />
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
                  onPress={() => {
                    const isItemInArray = amenities.some(
                      (obj) => obj.id === item.id
                    );

                    if (isItemInArray) {
                      setAmenities((prev: any) =>
                        prev.filter((obj: any) => item.id !== obj.id)
                      );
                    } else {
                      setAmenities((prev: any) => [...prev, item]);
                    }
                  }}
                  className="text-[15px] !text-[#696969] text-left !pl-3"
                >
                  {item.amenity_name}
                </SmallText>
              </View>
            </>
          ))}
          <Spacer value={H("3%")} axis="vertical" />
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="calendar-today"
              size={30}
              color={COLORS.primary}
            />
            {darkMode ? (
              <SmallText className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold">
                Opening Days
              </SmallText>
            ) : (
              <GradientText className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold">
                Opening Hours
              </GradientText>
            )}
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Monday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data?.listing_oh_monday || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Tuesday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_oh_tuesday || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Wednesday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_oh_wednesday || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Thursday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_oh_thursday || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Friday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_oh_friday || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Saturday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_oh_saturday || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Sunday
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_oh_sunday || "N/A"}
            </SmallText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="flex-row items-center">
            <AntDesign name="idcard" size={30} color={COLORS.primary} />
            {darkMode ? (
              <SmallText className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold">
                Contact Information
              </SmallText>
            ) : (
              <GradientText className="text-[#D4E1D2] text-left p-0 text-[19px] pl-2 font-RedHatDisplaySemiBold">
                Contact Information
              </GradientText>
            )}
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Phone Number
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data?.listing_phone || "N/A"}
            </SmallText>
          </View>
          <View
            style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Email Address
            </SmallText>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data.listing_email || "N/A"}
            </SmallText>
          </View>
          <View
            style={{
              borderTopColor: darkMode ? "#0F0F0F" : "#69696926",
              borderBottomColor: darkMode ? "#0F0F0F" : "#69696926",
            }}
            className="py-3 flex-row justify-between items-center border-t border-t-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Location
            </SmallText>
            <SmallText
              // numberOfLine={1}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
            >
              {route.params?.data?.listing_address || "N/A"}
            </SmallText>
          </View>
          <View
            style={{
              borderTopColor: darkMode ? "#0F0F0F" : "#69696926",
              borderBottomColor: darkMode ? "#0F0F0F" : "#69696926",
            }}
            className="py-3 flex-row justify-between items-center border-y border-y-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-[#696969] text-left p-0 text-[15px]"
            >
              Website
            </SmallText>
            <SmallText
              onPress={() =>
                Linking.openURL("https://vincentcollins.netlify.app/")
              }
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[15px]"
            >
              {route.params?.data?.listing_website || "N/A"}
            </SmallText>
          </View>
          {route.params?.data?.listing_social_item.length > 0 && (
            <View
              style={{
                borderTopColor: darkMode ? "#0F0F0F" : "#69696926",
                borderBottomColor: darkMode ? "#0F0F0F" : "#69696926",
              }}
              className="py-2 flex-row justify-between items-center border-b border-b-[#0F0F0F]"
            >
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
                className="text-[#696969] text-left p-0 text-[15px]"
              >
                Social Media
              </SmallText>
              <View className="flex-row items-center">
                {route.params?.data?.listing_social_item.map(
                  (item: any, idx: number) => (
                    <Pressable
                      onPress={() => Linking.openURL(item.social_url)}
                      className="ml-1"
                    >
                      {item.social_icon.toLowerCase() === "facebook" ? (
                        <Facebook height={30} width={30} />
                      ) : item.social_icon.toLowerCase() === "instagram" ? (
                        <Instagram height={30} width={30} />
                      ) : item.social_icon.toLowerCase() === "whatsapp" ? (
                        <Whatsapp height={30} width={30} />
                      ) : item.social_icon.toLowerCase() === "twitter" ? (
                        <Twitter height={30} width={30} />
                      ) : item.social_icon.toLowerCase() === "linkedin" ? (
                        <Linkedin height={30} width={30} />
                      ) : null}
                    </Pressable>
                  )
                )}
              </View>
            </View>
          )}

          <Spacer value={H("3%")} axis="vertical" />
          <MapView
            onPress={() =>
              navigation.navigate("MapScreen", { data: route.params?.data })
            }
            className="flex-1 w-full h-[200px]"
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: Number(route.params?.data?.address_latitude),
              longitude: Number(route.params?.data?.address_longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(route.params?.data?.address_latitude),
                longitude: Number(route.params?.data?.address_longitude),
              }}
              title={route.params?.data?.listing_name}
              description={route.params?.data?.listing_description?.replaceAll(
                /<\/?[^>]+(>|$)/gi,
                ""
              )}
            />
          </MapView>
          <Spacer value={H("3%")} axis="vertical" />
          <Button
            text="Book Now"
            onPress={() =>
              Boolean(loggedIn && access_token)
                ? bookRef.current?.open()
                : (() => {
                    Toast.show({
                      type: "error",
                      text1: "Login to book this listing.",
                    });
                    navigation.navigate("Signin");
                  })()
            }
            buttonStyle={{ width: "100%" }}
          />
          <Spacer value={H("1%")} axis="vertical" />
        </ScrollView>
      </SafeAreaView>
      <BottomSheet ref={bookRef} duration={3000} height={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          className="flex-1 bg-[#1b1b1b] py-5 px-3"
        >
          <View className="w-full flex-row justify-between items-center">
            <View className="w-[23%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Day
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setDay(value);
                }}
                defaultValue={day}
                placeholder="02"
                className="border border-[#696969] bg-[#000000]"
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
            <View className="w-[30%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Month
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setMonth(value);
                }}
                defaultValue={month}
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                placeholder="05"
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
            <View className="w-[30%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Year
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setYear(value);
                }}
                placeholder="2022"
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                defaultValue={year}
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-[60%] flex-row justify-between items-center">
            <View className="w-[40%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
              >
                Time
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setHour(value);
                }}
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                defaultValue={hour}
                placeholder="14"
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[40px] mt-5 font-RedHatDisplayRegular"
            >
              :
            </SmallText>
            <View className="w-[40%]">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                {" "}
              </SmallText>
              <InputField
                onTextChange={function (value: string): void {
                  setMinutes(value);
                }}
                defaultValue={minutes}
                style={{ backgroundColor: darkMode ? "black" : "white" }}
                placeholder="60"
                className="border border-[#696969] bg-[#000000]"
                containerStyle={{ width: "100%" }}
                type={"numeric"}
                autoCapitalize={"none"}
              />
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <Button
            text="Book Date"
            onPress={() => {
              if (!isValidDate(Number(day), Number(month), Number(year))) {
                Toast.show({
                  type: "error",
                  text1: "Date is invalid",
                });
              } else if (
                !/^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(
                  `${hour}:${minutes}`
                )
              ) {
                Toast.show({
                  type: "error",
                  text1: "Time is invalid",
                });
              } else {
                bookRef.current?.close();
                DelayFor(200, () => {
                  dispatch(SET_LOADER(true));
                  bookListing(
                    {
                      listing_id: route.params?.data.id,
                      date: `${year}-${month}-${day}`,
                      time: `${hour}:${minutes}`,
                    },
                    (response) => {
                      dispatch(SET_LOADER(false));
                      Toast.show({
                        type: "success",
                        text1: response.message,
                      });
                    },
                    (error) => {
                      dispatch(SET_LOADER(false));
                      Toast.show({
                        type: "error",
                        text1: error,
                      });
                    }
                  );
                });
              }
            }}
          />
          <Spacer value={H("6%")} axis="vertical" />
        </ScrollView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default FreelancerProfile;
