import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { RootState } from "../../store";
import { Title } from "../../components";
import { width, height } from "../../utility/constant";

const Privacy = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#FFFFFF",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Title style={{ color: darkMode ? "white" : "#0f0f0f" }}>
          Privacy Policy
        </Title>

        {/* Close Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="close"
            size={24}
            color={darkMode ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: "https://sabifix.biz/privacy-policy" }}
        startInLoadingState={true}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default Privacy;
