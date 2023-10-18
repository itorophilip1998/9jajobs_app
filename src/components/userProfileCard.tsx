import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../utility/colors";
import { FirstLetterUppercase } from "../utility/helpers";
import SmallText from "./smallText";
import { shadowBox } from "../style/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "./gradientText";

const UserProfileCard = ({
  item,
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
  item: {};
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row h-[auto] w-full rounded-md overflow-hidden bg-[#0F0F0F]"
      style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        }}
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
            {FirstLetterUppercase("Servizio Rapido Technologies")}
          </SmallText>
          {/* {item.verified && (
              <MaterialIcons name="verified" size={18} color={COLORS.primary} />
              )} */}
          <MaterialIcons name="verified" size={18} color={COLORS.primary} />
        </View>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
          className="text-[#D4E1D2] text-left p-0 text-[15px] w-full"
        >
          {FirstLetterUppercase("Fashion Designer")}
        </SmallText>
        <View className="flex-row items-center justify-between mt-2 w-full">
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0F0F0F" }}
            className="text-[#696969] text-right p-0 text-[13px]"
          >
            {FirstLetterUppercase("Abuja, Nigeria")}
          </SmallText>
          <SmallText className="text-primary p-0 text-[13px] pl-1">
            4.2km away
          </SmallText>
        </View>
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
              <TouchableOpacity className="bg-white py-2 px-4 w-[100%] justify-center items-center rounded-full">
                <GradientText className="text-white p-0 text-[15px] pl-1">
                  Call
                </GradientText>
              </TouchableOpacity>
            </LinearGradient>
          )}
          <TouchableOpacity
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
      </View>
    </TouchableOpacity>
  );
};

export default UserProfileCard;
