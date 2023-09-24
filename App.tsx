import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useCustomFonts } from "./src/hooks/customFonts";
import * as SplashScreen from "expo-splash-screen";
import { height, width } from "./src/utility/constant";
import { persistor, store } from "./src/store";
import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./src/navigation";
import Toast from "react-native-toast-message";
import { ToastConfig, BaseToast, ErrorToast } from "react-native-toast-message";
import { FONTS } from "./src/utility/fonts";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontLoaded = useCustomFonts();

  if (fontLoaded) {
    SplashScreen.hideAsync();
  } else {
    return null;
  }

  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#4BAF4F",
          backgroundColor: "#161B22",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          fontFamily: FONTS.RedHatDisplayRegular,
          color: "#fff",
        }}
        text2Style={{ fontSize: 12, fontFamily: FONTS.RedHatDisplayRegular }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "red",
          backgroundColor: "#161B22",
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          color: "#fff",
          fontFamily: FONTS.RedHatDisplayRegular,
        }}
        text2Style={{
          fontSize: 12,
          fontFamily: FONTS.RedHatDisplayRegular,
        }}
      />
    ),
  };

  return (
    <View className={`flex-1 w-[${width}px] h-[${height}px]`}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </View>
  );
}
