import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
  Pressable,
  Alert,
  FlatList,
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
import { DatePicker, TimePicker } from "../../components/datePicker";
import ShowImage from "../modals/showImage";
import YoutubeVideos from "../modals/youtubeVideos";
import BorderBottom from "../../components/borderBottom";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FONTS } from "../../utility/fonts";

const FreelancerProfile = ({
  navigation,
  route,
}: {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const { darkMode, loggedIn, access_token, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const [amenities, setAmenities] = React.useState<any[]>([]);
  const [videoData, setVideoData] = React.useState<any>(null);

  const bookRef = React.useRef<RBSheet | null>(null);
  const [profileImg, setProfileImg] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [isDate, setDateActive] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>("");
  const [locationFocus, setLocationFocus] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<string>("");
  const [isTime, setTimeActive] = React.useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "white",
      }}
    >
      <SafeAreaView className="flex-1 w-full pt-4 ">
        <View className="w-full px-4 mb-3">
          <TitleWithButton title="" fire={() => navigation.goBack()} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          <Pressable
            style={{
              shadowColor: "#969191", // Shadow color
              shadowOffset: { width: 0, height: 2 }, // Shadow offset
              shadowOpacity: 0.4, // Shadow opacity
              shadowRadius: 7, // Shadow radius
              elevation: 3,
            }}
            onPress={() =>
              setProfileImg(route.params?.data?.listing_featured_photo || "")
            }
            className="w-full h-[230px] rounded-full mx-auto"
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
              className="w-full h-full rounded-md"
            />
          </Pressable>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="flex-row items-center justify-between mt-2 w-full">
            <View className="w-[50%]">
              <View className="flex-row items-center mb-1 w-full pr-3">
                {darkMode ? (
                  <SmallText
                    // numberOfLine={1}
                    className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplaySemiBold"
                  >
                    {FirstLetterUppercase(
                      route.params?.data?.listing_name || ""
                    )}
                  </SmallText>
                ) : (
                  <GradientText
                    // numberOfLines={1}
                    className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplaySemiBold"
                  >
                    {FirstLetterUppercase(
                      route.params?.data?.listing_name || ""
                    )}
                  </GradientText>
                )}
                {route.params?.data?.verified &&
                  route.params?.data?.verified?.status === "completed" && (
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
                  // numberOfLine={1}
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#D4E1D2] text-left p-0 text-[15px] w-[75%]"
                >
                  {FirstLetterUppercase(
                    route.params?.data?.r_listing_category
                      ?.listing_category_name || ""
                  )}
                </SmallText>
                {/* <View className="flex-row items-center">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[15px] pl-1">
                    {route.params?.data.rate_star}
                  </SmallText>
                </View> */}
              </View>
              <Spacer value={H("0.5%")} axis="vertical" />
              <View className="flex-row justify-between items-center mb-1 w-full">
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
                  {FirstLetterUppercase(route.params?.data.km + " Km Away")}
                </SmallText>

                <View className="flex-row items-center">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[15px] pl-1">
                    {route.params?.data.rate_star}
                  </SmallText>
                </View>
              </View>
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
                    : Linking.openURL(
                        `tel:${
                          route.params?.data?.listing_phone?.replace(
                            /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                            ""
                          ) ||
                          route.params?.data?.user?.phone?.replace(
                            /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                            ""
                          ) ||
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
                  Boolean(loggedIn && access_token)
                    ? navigation.navigate("Report", {
                        data: route.params?.data,
                      })
                    : (() => {
                        Toast.show({
                          type: "error",
                          text1: "Login to report this listing.",
                        });
                        navigation.navigate("Signin");
                      })()
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
          <Spacer value={H("2%")} axis="vertical" />
          <BorderBottom />
          <Spacer value={H("2%")} axis="vertical" />
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
            {route.params?.data?.listing_description
              ?.replaceAll(/<\/?[^>]+(>|$)/gi, "")
              ?.replaceAll(/&nbsp;/g, " ")}
          </SmallText>
          <Spacer value={H("2%")} axis="vertical" />
          <BorderBottom />
          <Spacer value={H("2%")} axis="vertical" />
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
                      <TouchableWithoutFeedback
                        onPress={() => setProfileImg(item.photo || "")}
                      >
                        <Image
                          key={idx}
                          source={{
                            uri: item.photo,
                          }}
                          alt=""
                          className="w-[150px] h-[100px] rounded-lg"
                        />
                      </TouchableWithoutFeedback>
                      <Spacer value={W("5%")} axis="horizontal" key={idx + 1} />
                    </>
                  )
                )}
              </ScrollView>
              <Spacer value={H("2%")} axis="vertical" />
              <BorderBottom />
              <Spacer value={H("2%")} axis="vertical" />
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
                {route.params?.data?.listings_videos.map(
                  (item: any, idx: number) => (
                    <React.Fragment key={idx}>
                      <VideoCard
                        item={item}
                        openYoutube={(e) => setVideoData(e)}
                      />
                      <Spacer value={W("5%")} axis="horizontal" key={idx + 1} />
                    </React.Fragment>
                  )
                )}
              </ScrollView>
              <Spacer value={H("2%")} axis="vertical" />
              <BorderBottom />
              <Spacer value={H("2%")} axis="vertical" />
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
                  {item.amenity_name || item?.amenity_details?.amenity_name}
                </SmallText>
              </View>
            </>
          ))}
          <Spacer value={H("2%")} axis="vertical" />
          <BorderBottom />
          <Spacer value={H("2%")} axis="vertical" />
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
            >
              {route.params?.data.listing_oh_sunday || "N/A"}
            </SmallText>
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <BorderBottom />
          <Spacer value={H("2%")} axis="vertical" />
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
              // numberOfLine={1}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
              onPress={() =>
                !route.params?.data?.listing_phone &&
                !route.params?.data?.user?.phone
                  ? null
                  : Linking.openURL(
                      `tel:${
                        route.params?.data?.listing_phone?.replace(
                          /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                          ""
                        ) ||
                        route.params?.data?.user?.phone?.replace(
                          /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                          ""
                        ) ||
                        ""
                      }`
                    )
              }
            >
              {route.params?.data?.listing_phone ||
                route?.params?.data?.user?.phone ||
                "N/A"}
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
              // numberOfLine={1}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
              onPress={() =>
                route.params?.data.listing_email &&
                Linking.openURL(`mailto:${route.params?.data.listing_email}`)
              }
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
              // numberOfLine={1}
              onPress={() =>
                route.params?.data?.listing_website
                  ? Linking.openURL(
                      route.params?.data?.listing_website?.includes("://")
                        ? route.params?.data?.listing_website
                        : `http://${route.params?.data?.listing_website}`
                    )
                  : undefined
              }
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-right p-0 text-[15px] w-[70%]"
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
                  (item: any, idx: number) => {
                    return (
                      <Pressable
                        key={idx}
                        onPress={async () => {
                          try {
                            const supported = await Linking.canOpenURL(
                              item.social_url?.includes("://")
                                ? item.social_url
                                : `http://${item.social_url}`
                            );
                            if (supported) {
                              await Linking.openURL(
                                item.social_url?.includes("://")
                                  ? item.social_url
                                  : `http://${item.social_url}`
                              );
                            } else {
                              Toast.show({
                                type: "error",
                                text1: `Invalid URL: ${item.social_url}`,
                              });
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
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
                    );
                  }
                )}
              </View>
            </View>
          )}
          <Spacer value={H("3%")} axis="vertical" />
          {Boolean(
            route.params?.data?.address_latitude &&
              route.params?.data?.address_longitude
          ) && (
            <>
              <MapView
                onPress={() =>
                  navigation.navigate("MapScreen", { data: route.params?.data })
                }
                className="flex-1 w-full h-[200px]"
                minZoomLevel={7}
                scrollEnabled={false}
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
            </>
          )}
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

      <BottomSheet ref={bookRef} duration={3000} height={H("50%")}>
        <View
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          className="flex-1 bg-[#1b1b1b] py-3 px-3"
        >
          {!locationFocus && (
            <>
              {/* <Spacer value={H("1%")} axis="vertical" /> */}

              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-2 font-RedHatDisplayRegular"
              >
                Date
              </SmallText>
              <DatePicker
                date={date}
                isDate={isDate}
                setDate={setDate}
                setDateActive={setDateActive}
              />
              <Spacer value={H("3%")} axis="vertical" />

              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
              >
                Time
              </SmallText>
              <TimePicker
                isTime={isTime}
                setTime={setTime}
                setTimeActive={setTimeActive}
                time={time}
              />
              <Spacer value={H("3%")} axis="vertical" />
            </>
          )}
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
          >
            Location
          </SmallText>
          <GooglePlacesAutocomplete
            placeholder="Search location"
            enableHighAccuracyLocation
            debounce={400}
            textInputProps={{
              onFocus: () => {
                setLocationFocus(true);
              },
              onBlur: () => {
                setLocationFocus(false);
              },
            }}
            onPress={(data, details = null) => {
              setLocation(details?.formatted_address || "");
            }}
            query={{
              key: "AIzaSyC6yqP8_qWQsmhyqkSrAgTm7CUQ6yHwzRY",
              language: "en",
              components: "country:NG",
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            renderRow={(rowData) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Ionicons
                  name="ios-location-sharp"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontFamily: FONTS.RedHatDisplayRegular,
                    color: "#0f0f0f",
                  }}
                >
                  {rowData.description}
                </Text>
              </View>
            )}
            styles={{
              textInput: {
                fontFamily: FONTS.RedHatDisplayRegular,
                backgroundColor: darkMode ? "black" : "white",
                color: darkMode ? "#c6c6c6" : "#0f0f0f",
                fontSize: 15,
                borderWidth: 1,
                borderColor: locationFocus ? COLORS.primary : "#696969",
                height: 50,
              },
            }}
          />
          {!locationFocus && (
            <>
              <Spacer value={H("3%")} axis="vertical" />

              <Button
                text="Book Date"
                buttonStyle={{ width: "100%" }}
                onPress={() => {
                  if (route.params?.data?.user?.id === profile?.id) {
                    Toast.show({
                      type: "error",
                      text1: "You cannot book yourself",
                    });
                    return;
                  } else if (date === "") {
                    Toast.show({
                      type: "error",
                      text1: "Date cannot be empty",
                    });
                    return;
                  }
                  if (time === "") {
                    Toast.show({
                      type: "error",
                      text1: "Time cannot be empty",
                    });
                    return;
                  }
                  if (location === "") {
                    Toast.show({
                      type: "error",
                      text1: "Location cannot be empty",
                    });
                    return;
                  }
                  bookRef.current?.close();
                  DelayFor(200, () => {
                    dispatch(SET_LOADER(true));
                    bookListing(
                      {
                        listing_id: route.params?.data.id,
                        date: date,
                        time: time,
                        location,
                      },
                      (response) => {
                        dispatch(SET_LOADER(false));
                        navigation.navigate("Dashboard");
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
                }}
              />
              <Spacer value={H("2%")} axis="vertical" />
            </>
          )}
        </View>
      </BottomSheet>
      <ShowImage
        close={() => setProfileImg("")}
        img={profileImg}
        visible={!!profileImg}
      />
      <YoutubeVideos
        visible={Boolean(videoData)}
        close={() => setVideoData(null)}
        item={videoData}
      />
    </KeyboardAvoidingView>
  );
};

export default FreelancerProfile;
