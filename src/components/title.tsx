import { View, Text } from "react-native";
import React from "react";

interface IProps {
  style?: string;
  children: string | string[];
}

const Title: React.FC<IProps> = ({ style, children }) => {
  return (
    <Text
      className={`text-black text-[27px] font-semibold font-CabinetGroteskBold ${style}`}
    >
      {children}
    </Text>
  );
};

export default Title;
