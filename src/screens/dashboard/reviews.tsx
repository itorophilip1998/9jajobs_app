import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Button, SmallText, Spacer } from "../../components";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import { FirstLetterUppercase } from "../../utility/helpers";
import ReviewCard from "../../components/reviewCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import userImg from "../../../assets/images/user.jpg";
import { SET_LOADER } from "../../store/formDataSlice";
import Toast from "react-native-toast-message";
import { getRating } from "../../api/rating";
import { useAuthorize } from "../../hooks/useAuthorized";

const Reviews = ({
  navigation,
  route,
}: {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode, access_token, loggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const [rating, setRating] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getRating(
        route.params?.data.id,
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
  }, [route.params?.data.id, focus]);

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
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f] mb-3"
        >
          <TitleWithButton title="Reviews" fire={() => navigation.goBack()} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="px-3">
          <Spacer value={H("1%")} axis="vertical" />
          <View className="flex-row h-[auto] w-full">
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
              className="w-[90px] h-[90px] rounded-full"
            />
            <View className="flex-1 py-2 px-3">
              <View className="flex-row items-center mb-1 w-full">
                <SmallText
                  numberOfLine={1}
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplayMedium"
                >
                  {FirstLetterUppercase(route.params?.data?.listing_name || "")}
                </SmallText>
                {route.params?.data?.verified &&
                  route.params?.data?.verified?.status === "completed" && (
                    <MaterialIcons
                      name="verified"
                      size={18}
                      color={COLORS.primary}
                    />
                  )}
              </View>
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 text-[15px] w-full"
              >
                {FirstLetterUppercase(
                  route.params?.data?.r_listing_category
                    ?.listing_category_name || ""
                )}
              </SmallText>
              <View className="flex-row items-center  mt-2 w-full">
                <SmallText className="text-[#696969] text-left p-0 text-[13px] max-w-[70%]">
                  {FirstLetterUppercase(
                    `${route.params?.data?.km} km away` || ""
                  )}
                </SmallText>
                <View className="flex-row items-center ml-4">
                  <AntDesign name="star" size={15} color={COLORS.primary} />
                  <SmallText className="text-primary p-0 text-[13px] pl-1">
                    {route.params?.data.rate_star}
                  </SmallText>
                </View>
              </View>
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          {rating.map((item: any, idx: number) => (
            <>
              <ReviewCard item={item} key={idx} />
              <Spacer key={idx + 1} value={H("3%")} axis="vertical" />
            </>
          ))}
          <Button
            text="Add Review"
            onPress={() =>
              Boolean(loggedIn && access_token)
                ? navigation.navigate("AddReview", { data: route.params?.data })
                : (() => {
                    navigation.navigate("Signin");
                    Toast.show({
                      type: "error",
                      text1: "Please login to add a review.",
                    });
                  })()
            }
            buttonStyle={{ width: "100%" }}
          />
          <Spacer value={H("3%")} axis="vertical" />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Reviews;
