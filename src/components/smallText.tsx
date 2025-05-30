import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";

interface IProps {
  numberOfLine?: number;
  className?: string;
  children: any;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const SmallText: React.FC<IProps> = ({
  className,
  children,
  style,
  numberOfLine,
  onPress,
}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLine}
      className={`px-[19px] text-center text-[15px] font-RedHatDisplayRegular text-dark02 ${className}`}
      style={style}
    >
      {children}
    </Text>
  );
};

export default SmallText;
