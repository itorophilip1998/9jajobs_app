import { View, Text } from "react-native";
import React from "react";

interface IProps {
  children: string | string[];
  className?: string;
}

const Title: React.FC<IProps> = ({ children, className }) => {
  return (
    <Text
      className={`text-black text-[27px] font-semibold font-RedHatDisplayRegular ${className}`}
    >
      {children}
    </Text>
  );
};

export default Title;
