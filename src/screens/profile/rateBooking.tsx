import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";

import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { Button, InputField, SmallText, Spacer } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LinearGradient } from "expo-linear-gradient";
// @ts-ignore
import StarRating from "react-native-star-rating";
import { COLORS } from "../../utility/colors";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { SET_LOADER } from "../../store/formDataSlice";
import { postRate } from "../../api/rating";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const RateBooking = ({
  navigation,
  route,
}: {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const [review, setReview] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);
  const { darkMode, loggedIn, access_token, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused) {
      if (!Boolean(loggedIn && access_token)) {
        Toast.show({
          type: "error",
          text1: "Login to add a review.",
        });
        navigation.navigate("Signin");
      }
    }
  }, [focused, loggedIn, access_token]);

  const addReview = () => {
    dispatch(SET_LOADER(true));
    postRate(
      {
        booking_id: route.params?.data?.id,
        review: review,
        rating: rating.toString(),
      },
      (response) => {
        dispatch(SET_LOADER(false));
        Toast.show({
          type: "success",
          text1: response.message,
        });
        if (route.params?.two_step) {
          navigation.pop(2);
        } else {
          navigation.goBack();
        }
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
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f] mb-3"
        >
          <TitleWithButton
            title="Rating and Review"
            fire={() => navigation.goBack()}
          />
        </View>
        <ScrollView className="flex-1 px-3 w-full">
          <Spacer axis="vertical" value={H("2%")} />
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
            className="text-[#696969] text-center p-0 text-[17px] pr-2 font-RedHatDisplayRegular"
          >
            Tell us about your experience with this service provider in our
            platform
          </SmallText>
          <Spacer axis="vertical" value={H("3%")} />
          <View className="w-[70%] mx-auto">
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(rating: number) => setRating(rating)}
              fullStarColor={COLORS.primary} // Adjust colors based on mode
              emptyStarColor={COLORS.primary}
            />
          </View>
          <Spacer axis="vertical" value={H("3%")} />
          {darkMode ? (
            <InputField
              defaultValue={review}
              onTextChange={(value) => setReview(value)}
              type={"default"}
              autoCapitalize={"sentences"}
              multiline={true}
              numberOfLines={7}
              className="border border-[#696969] h-[150px] w-full"
              containerStyle={{ width: "100%", height: 150, borderRadius: 8 }}
              placeholder="Enter your review"
            />
          ) : (
            <LinearGradient
              colors={["#023215", "#1A911B"]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              className="bg-black overflow-hidden rounded-lg w-[100%] px-[1px] py-[1px]"
            >
              <InputField
                defaultValue={review}
                onTextChange={(value) => setReview(value)}
                type={"default"}
                autoCapitalize={"sentences"}
                containerStyle={{
                  width: "100%",
                  height: 150,
                  backgroundColor: "white",
                  borderRadius: 8,
                }}
                className="h-[150px] w-full"
                multiline={true}
                numberOfLines={7}
                placeholder="Enter your review"
              />
            </LinearGradient>
          )}
          <Spacer axis="vertical" value={H("3%")} />
          <Button
            text="Submit Review"
            onPress={() =>
              rating <= 0
                ? Toast.show({
                    type: "error",
                    text1: "Please select rating.",
                  })
                : route.params?.data?.listings?.user?.id === profile?.id
                ? Toast.show({
                    type: "error",
                    text1: "You cannot rate your listing.",
                  })
                : addReview()
            }
            buttonStyle={{ width: "100%" }}
          />
          <Spacer axis="vertical" value={H("3%")} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RateBooking;
