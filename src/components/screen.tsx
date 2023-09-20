import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { width, height } from "../utility/constant";

interface IProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
  nativeStyle?: ViewStyle;
}

const Screen: React.FC<IProps> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={`bg-white items-center flex-1 w-full relative ${props.className}`}
        style={{
          // paddingHorizontal: width * 0.08,
          paddingVertical: height * 0.05,
          ...props.nativeStyle,
        }}
      >
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Screen;
