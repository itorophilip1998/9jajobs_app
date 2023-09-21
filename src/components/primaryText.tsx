import { Text, TextStyle, TouchableWithoutFeedback, StyleProp } from "react-native";
import React from "react";

interface IProps {
  children: any;
  onPress: () => void;
  className?: string;
  style?: StyleProp<TextStyle>
}

const PrimaryText: React.FC<IProps> = ({ children, onPress, className, style }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <Text
        className={`!text-primary text-[15px] font-semibold font-RedHatDisplaySemiBold ${className}`}
        style={style}
      >
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default PrimaryText;
