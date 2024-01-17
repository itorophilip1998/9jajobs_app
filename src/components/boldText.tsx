import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";

interface IProps {
  numberOfLine?: number;
  className?: string;
  children: any;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const BoldText: React.FC<IProps> = ({
  className,
  children,
  style,
  numberOfLine,
  onPress,
}) => {
    const parts = children.split('*');
  return (
    <>
      {parts.map((part, index) => {
        return index % 2 === 0 ? (
          <Text
            onPress={onPress}
            numberOfLines={numberOfLine}
            className={`px-[19px] text-center text-[15px] font-RedHatDisplayRegular text-dark02 ${className}`}
            style={style}
          >
            {children}
          </Text>
        ) : (
          <Text
            onPress={onPress}
            numberOfLines={numberOfLine}
            className={`px-[19px] text-center text-[15px] font-RedHatDisplayRegular text-dark02 font-semibold ${className}`}
            style={style}
          >
            {children}
          </Text>
        );
      })}
    </>
  );
};

export default BoldText;
