import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import React from "react";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const ContactMap = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, string>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "white",
      }}
    >
      <SafeAreaView className="flex-1 w-full">
        <View
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f] mb-3"
        >
          <TitleWithButton
            title={route.params?.data?.name}
            fire={() => navigation.goBack()}
          />
        </View>
        <MapView
          className="flex-1 w-full"
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: Number(route.params?.data?.lat),
            longitude: Number(route.params?.data?.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={7}
          scrollEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: Number(route.params?.data?.lat),
              longitude: Number(route.params?.data?.lng),
            }}
            title={route.params?.data?.name}
          />
        </MapView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ContactMap;
