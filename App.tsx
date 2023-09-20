import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useCustomFonts } from './src/hooks/customFonts';
import * as SplashScreen from "expo-splash-screen";
import { height, width } from './src/utility/constant';
import { persistor, store } from './src/store';
import { Provider } from "react-redux";
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/navigation';

export default function App() {

  const fontLoaded = useCustomFonts();

  if (fontLoaded) {
    SplashScreen.hideAsync();
  } else {
    return null;
  }


  return (
    <View className={`flex-1 w-[${width}px] h-[${height}px]`}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
}
