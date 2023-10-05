import {
  Text,
  TouchableOpacity,
  Keyboard,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import {
  customButtonStyle,
  gradientButton,
  buttonTextStyle,
} from "../style/buttons";
interface IProps {
  text: string;
  icon?: JSX.Element;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonStyleClassName?: string;
  textStyleClassName?: string;
  onPress?: () => void;
}

const Button: React.FC<IProps> = ({
  text,
  icon,
  onPress,
  textStyle,
  buttonStyle,
  buttonStyleClassName,
  textStyleClassName,
}) => {
  return (
    <TouchableOpacity
      className={`flex w-full h-[50px] justify-center items-center flex-row !bg-primary  ${buttonStyleClassName}`}
      style={{ width: W("90%"), ...buttonStyle, ...customButtonStyle }}
      onPress={() => {
        Keyboard.dismiss();
        onPress && onPress();
      }}
    >
      <LinearGradient
        colors={["#023215", "#1A911B"]}
        style={gradientButton}
        className={`flex w-full h-[50px] justify-center items-center flex-row !bg-primary  ${buttonStyleClassName}`}
      >
        {icon && icon}
        <Text
          className={`text-white text-lg font-semibold text-[15px] font-ManropeSemiBold ${textStyleClassName}`}
          style={{ marginLeft: icon ? 8 : 0, ...textStyle, ...buttonTextStyle }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
