import { View, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Filter from "../../assets/icons/filter.svg";
import SliderIcon from "./sliderIcon";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { GradientText } from "./gradientText";

interface IProps {
  left?: boolean;
  style?: string;
  title: string;
  buttonStyle?: string;
  fire?: () => void;
  rightFire?: () => void;
  rightIcon?: JSX.Element;
  right?: boolean;
  color?: string;
}

const TitleWithButton: React.FC<IProps> = ({
  style,
  left = true,
  right = false,
  title,
  fire,
  rightFire,
  rightIcon,
  color = "#696969",
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="relative flex flex-row items-center w-full justify-center py-4">
      {left && (
        <Pressable onPress={() => fire && fire()} className="absolute left-0">
          <Feather name="arrow-left-circle" size={30} color={color} />
        </Pressable>
      )}
      {darkMode ? (
        <Text
          className={`text-[#D4E1D2] text-[22px] font-RedHatDisplaySemiBold ${style}`}
        >
          {title}
        </Text>
      ) : (
        <GradientText
          className={`text-[#D4E1D2] text-[22px] font-RedHatDisplaySemiBold ${style}`}
        >
          {title}
        </GradientText>
      )}
      <View />
      {right && (
        <Pressable
          onPress={() => rightFire && rightFire()}
          className="absolute right-2"
        >
          {rightIcon ? rightIcon : <SliderIcon onPress={() => {}} />}
        </Pressable>
      )}
    </View>
  );
};

export default TitleWithButton;
