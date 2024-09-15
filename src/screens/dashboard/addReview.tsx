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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
import StarView from "react-native-star-view";
import { COLORS } from "../../utility/colors";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { SET_LOADER } from "../../store/formDataSlice";
import { postRate } from "../../api/rating";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import Stars from "react-native-stars"; 

const AddReview = ({
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

  // console.log();

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
        user_id: route.params?.data?.user?.id,
        listing_id: route.params?.data?.id,
        review: review,
        rating: String(rating),
      },
      (response) => {
        dispatch(SET_LOADER(false));
        Toast.show({
          type: "success",
          text1: "Successfully Rated",
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
          <TitleWithButton title="Review" fire={() => navigation.goBack()} />
        </View>
        <ScrollView className="flex-1 px-3 w-full">
          <Spacer axis="vertical" value={H("2%")} />
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
            className="text-[#696969] text-center p-0 text-[17px] pr-2 font-RedHatDisplayRegular"
          >
            Add a review by typing inside the box
          </SmallText>
          <Spacer axis="vertical" value={H("3%")} />
          <View className=" mx-auto">
          
            <Stars
              default={rating} // Current rating value
              count={5} // Total number of stars
              half={false} // Disable half-star ratings (optional)
              starSize={50} // Size of the stars
              fullStar={<Icon name={"star"} size={50} color={COLORS.primary} />} // Full star (yellow color)
              emptyStar={
                <Icon name={"star-outline"} size={50} color={COLORS.primary} />
              } // Empty star (yellow color)
              update={(newRating: number) => setRating(newRating)} // Function to update the rating
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
                : route.params?.data.user?.id === profile?.id
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

export default AddReview;
