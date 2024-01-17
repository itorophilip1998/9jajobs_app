import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../utility/colors";
import { FirstLetterUppercase, validatePhone } from "../utility/helpers";
import SmallText from "./smallText";
import { shadowBox, shadowBoxDark } from "../style/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "./gradientText";
import userImg from "../../assets/images/user.jpg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

const UserProfileCard = ({
  navigation,
  hide = false,
  item,
  onPress,
}: {
  navigation: NativeStackNavigationProp<any>;
  onPress: (event: GestureResponderEvent) => void;
  item: any;
  hide?: boolean;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  // console.log(item.user);
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row h-[auto] w-full  rounded-md overflow-hidden bg-[#0F0F0F]"
      style={[
        darkMode ? shadowBox : shadowBoxDark,
        { backgroundColor: darkMode ? "#0F0F0F" : "white" },
      ]}
    >
      <Image
        source={
          item?.listing_featured_photo &&
          item?.listing_featured_photo.length > 0
            ? {
                uri: item?.listing_featured_photo,
              }
            : userImg
        }
        alt=""
        resizeMode="cover"
        className="w-[40%] my-3 ml-3 object-cover"
      />
      <View className="w-[58%] py-3 px-3">
        <View className="flex-row items-center mb-1 w-full">
          <SmallText
            numberOfLine={1}
            style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
            className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplayMedium max-w-[90%]"
          >
            {FirstLetterUppercase(item?.listing_name || "")}
          </SmallText>
          {item?.verified && item?.verified?.status === "completed" && (
            <MaterialIcons name="verified" size={18} color={COLORS.primary} />
          )}
        </View>
        <SmallText
          numberOfLine={1}
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
          className="text-[#D4E1D2] text-left p-0 text-[15px] w-full"
        >
          {FirstLetterUppercase(
            item?.r_listing_category?.listing_category_name || ""
          )}
        </SmallText>
        <View className="flex-row items-center justify-between mt-2 w-full">
          <SmallText
            numberOfLine={1}
            style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
            className="text-[#696969] text-left p-0 text-[13px] flex-1"
          >
            {FirstLetterUppercase(item?.listing_address || "")}
          </SmallText>
          {item?.km && (
            <SmallText
              numberOfLine={1}
              // style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
              className="text-primary text-right p-0 text-[13px] w-[35%] ml-[2%]"
            >
              {FirstLetterUppercase(`${item?.km} km` || "")}
            </SmallText>
          )}
        </View>
        {!hide && (
          <View className="flex-row items-center justify-between mt-2 w-full">
            {darkMode ? (
              <TouchableOpacity
                style={[
                  darkMode && shadowBox,
                  {
                    backgroundColor: "black",
                  },
                ]}
                className="bg-black w-[47%] py-2 px-4 justify-center items-center rounded-full"
                onPress={() =>
                  !item?.listing_phone && !item?.user?.phone
                    ? Toast.show({
                        type: "error",
                        text1: "This listing does not have a phone number.",
                      })
                    : Linking.openURL(
                        `tel:${
                          item?.listing_phone.replace(
                            /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                            ""
                          ) ||
                          item?.user?.phone.replace(
                            /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                            ""
                          )
                        }`
                      )
                }
              >
                <SmallText className="text-white p-0 text-[15px] pl-1">
                  Call
                </SmallText>
              </TouchableOpacity>
            ) : (
              <LinearGradient
                colors={["#023215", "#1A911B"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                className="bg-black w-[47%] px-[1px] py-[1px] justify-center items-center rounded-full"
              >
                <TouchableOpacity
                  onPress={() =>
                    !item?.listing_phone && !item?.user?.phone
                      ? Toast.show({
                          type: "error",
                          text1: "This listing does not have a phone number.",
                        })
                      : Linking.openURL(
                          `tel:${
                            item?.listing_phone.replace(
                              /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                              ""
                            ) ||
                            item?.user?.phone.replace(
                              /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                              ""
                            )
                          }`
                        )
                  }
                  className="bg-white py-2 px-4 w-[100%] justify-center items-center rounded-full"
                >
                  <GradientText className="text-white p-0 text-[15px] pl-1">
                    Call
                  </GradientText>
                </TouchableOpacity>
              </LinearGradient>
            )}
            <TouchableOpacity
              onPress={() =>
                item?.user
                  ? navigation.navigate("Chat", { data: item.user })
                  : Toast.show({
                      type: "error",
                      text1: "This listing does not have a user.",
                    })
              }
              style={[
                shadowBox,
                { backgroundColor: darkMode ? "black" : "#D4E1D2" },
              ]}
              className="bg-black py-2 px-4 w-[47%] justify-center items-center rounded-full"
            >
              {darkMode ? (
                <SmallText className="text-white p-0 text-[15px] pl-1">
                  Chat
                </SmallText>
              ) : (
                <GradientText className="text-white p-0 text-[15px] pl-1">
                  Chat
                </GradientText>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UserProfileCard;
