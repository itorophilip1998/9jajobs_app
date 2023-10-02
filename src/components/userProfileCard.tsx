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

const UserProfileCard = ({
  item,
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
  item: {};
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row h-[auto] w-full rounded-md overflow-hidden bg-[#1b1b1b]"
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        }}
        alt=""
        className="w-[40%]"
      />
      <View className="w-[60%] py-2 px-3">
        <View className="flex-row items-center mb-1 w-full">
          <SmallText className="text-[#D4E1D2] text-left p-0 text-[18px] pr-2 font-RedHatDisplayMedium">
            {FirstLetterUppercase("collins Vincent")}
          </SmallText>
          {/* {item.verified && (
              <MaterialIcons name="verified" size={18} color={COLORS.primary} />
              )} */}
          <MaterialIcons name="verified" size={18} color={COLORS.primary} />
        </View>
        <SmallText className="text-[#D4E1D2] text-left p-0 text-[15px] w-full">
          {FirstLetterUppercase("Fashion Designer")}
        </SmallText>
        <View className="flex-row items-center justify-between mt-2 w-full">
          <SmallText className="text-[#696969] text-right p-0 text-[13px]">
            {FirstLetterUppercase("Abuja, Nigeria")}
          </SmallText>
          <SmallText className="text-primary p-0 text-[13px] pl-1">
            4.2km away
          </SmallText>
        </View>
        <View className="flex-row items-center justify-between mt-2 w-full">
          <TouchableOpacity className="bg-black py-2 w-[47%] justify-center items-center px-4 rounded-full">
            <SmallText className="text-white p-0 text-[15px] pl-1">
              Call
            </SmallText>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black py-2 px-4 w-[47%] justify-center items-center rounded-full">
            <SmallText className="text-white p-0 text-[15px] pl-1">
              Chat
            </SmallText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserProfileCard;
