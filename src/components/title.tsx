import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";

interface IProps {
  children: string | string[];
  className?: string;
  style?: StyleProp<TextStyle>;
}

const Title: React.FC<IProps> = ({ children, className, style }) => {
  return (
    <Text
      style={style}
      className={`text-black text-[27px] font-semibold font-RedHatDisplayRegular ${className}`}
    >
      {children}
    </Text>
  );
};

export default Title;
