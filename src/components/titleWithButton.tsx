import { View, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Filter from "../../assets/icons/filter.svg";

interface IProps {
  left?: boolean;
  style?: string;
  title: string;
  buttonStyle?: string;
  fire?: () => void;
  rightFire?: () => void;
  rightIcon?: JSX.Element;
  right?: boolean;
  color?: string;
}

const TitleWithButton: React.FC<IProps> = ({
  style,
  left = true,
  right = false,
  title,
  fire,
  rightFire,
  rightIcon,
  color = "#212121",
}) => {
  return (
    <View className="relative flex flex-row items-center w-full justify-center">
      {left && (
        <Pressable onPress={() => fire && fire()} className="absolute left-2">
          <Feather name="chevron-left" size={32} color={color} />
        </Pressable>
      )}
      <Text
        className={`text-black text-[24px] font-semibold font-CabinetGroteskBold ${style}`}
      >
        {title}
      </Text>
      {right && (
        <Pressable
          onPress={() => rightFire && rightFire()}
          className="absolute right-2"
        >
          {rightIcon ? rightIcon : <Filter stroke={color} />}
        </Pressable>
      )}
    </View>
  );
};

export default TitleWithButton;
