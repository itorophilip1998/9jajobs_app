import { ActivityIndicator, Text, View,  } from "react-native";
import React from "react";
import { COLORS } from "../utility/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Loader = () => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="flex-1 justify-center items-center">
      <View
        style={{
          // shadowColor: COLORS.black02,
          // shadowOffset: {
          //   width: 5,
          //   height: 5,
          // },
          // shadowOpacity: 0.5,
          // shadowRadius: 5,
          // backgroundColor: darkMode ? "black" : "white",
        }}
        className="flex justify-center items-center bg-transparent rounded-3xl h-[60px] w-[60px]"
      >
        <ActivityIndicator size={"large"} color={COLORS.primary}/>
      </View>
    </View>
  );
};

export default Loader;
