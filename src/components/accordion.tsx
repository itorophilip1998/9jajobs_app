import { View, Text, Animated, TouchableWithoutFeedback, UIManager, Platform, LayoutAnimation } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SmallText from "./smallText";
import { AntDesign } from "@expo/vector-icons";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const Accordion = ({ title, body }: { title: string; body: string }) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = React.useState<boolean>(false);
  const [animation] = React.useState<Animated.Value>(new Animated.Value(0));

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpen(!open);
  };

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (body.split(" ").length / 2.6) * 14],
  });
  return (
    <View
      className="rounded-md py-3 px-3"
      style={{ backgroundColor: darkMode ? "#0f0f0f" : "#fff" }}
    >
      <TouchableWithoutFeedback onPress={toggle}>
        <View className="flex-row justify-between items-center">
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
            className="font-RedHatDisplayRegular text-[16px] p-0 text-left"
          >
            {title}
          </SmallText>
          <AntDesign
            name={open ? "up" : "down"}
            size={15}
            color={darkMode ? "#696969" : "#0f0f0f0"}
          />
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{ height: open ? 'auto' : 0, overflow: 'hidden', paddingTop: 8 }}
      >
        <Text
          style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
          className="font-RedHatDisplayRegular text-[16px] p-0 text-left"
        >
          {body}
        </Text>
      </View>
    </View>
  );
};

export default Accordion;
