import { ActivityIndicator, Text, View,  } from "react-native";
import React from "react";
import { COLORS } from "../utility/colors";

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <View
        style={{
          shadowColor: COLORS.black02,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.8,
          shadowRadius: 0,
        }}
        className="flex justify-center items-center bg-white rounded-3xl h-[60px] w-[60px]"
      >
        <ActivityIndicator size={"small"} color={COLORS.primary}/>
      </View>
    </View>
  );
};

export default Loader;
