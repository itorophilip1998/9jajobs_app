import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";

interface IProps {
  className?: string;
  children: any;
  style?: StyleProp<TextStyle>
}

const SmallText: React.FC<IProps> = ({ className, children, style }) => {
  return (
    <Text
      className={`px-[19px] text-center text-[15px] font-ManropeRegular text-dark02 ${className}`}
      style={style}
    >
      {children}
    </Text>
  );
};

export default SmallText;
