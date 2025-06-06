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
import { gradientButton } from "../style/buttons";
interface IProps {
  text: string;
  disabled?: boolean;
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
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      className={`flex w-full h-[50px] justify-center items-center flex-row ${buttonStyleClassName}`}
      style={{ width: W("90%"), ...buttonStyle }}
      onPress={() => {
        Keyboard.dismiss();
        onPress && onPress();
      }}
      disabled={disabled}
    >
      <LinearGradient
        colors={["#023215", "#1A911B"]}
        style={gradientButton}
        className={`flex w-full h-[50px] justify-center items-center flex-row  ${buttonStyleClassName}`}
      >
        {icon && icon}
        {text.length > 0 && (
          <Text
            className={`text-white font-semibold text-[15px] font-ManropeSemiBold ${textStyleClassName}`}
            style={{
              marginLeft: icon ? 8 : 0,
              ...textStyle,
            }}
          >
            {text}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
