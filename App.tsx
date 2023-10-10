import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useCustomFonts } from "./src/hooks/customFonts";
import * as SplashScreen from "expo-splash-screen";
import { height, width } from "./src/utility/constant";
import { RootState, persistor, store } from "./src/store";
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


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
