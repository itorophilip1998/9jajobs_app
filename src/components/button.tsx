import {
  Text,
  TouchableOpacity,
  Keyboard,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

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
      className={`flex w-full h-[50px] justify-center items-center flex-row !bg-primary rounded-md ${buttonStyleClassName}`}
      style={{ width: W("85%"), ...buttonStyle }}
      onPress={() => {
        Keyboard.dismiss();
        onPress && onPress();
      }}
    >
      {icon && icon}
      <Text
        className={`text-white text-lg font-semibold text-[15px] font-ManropeSemiBold ${textStyleClassName}`}
        style={{ marginLeft: icon ? 8 : 0, ...textStyle }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
