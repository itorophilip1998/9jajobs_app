import { View, Text } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { googleSignIn } from "../api/auth";
import { useDispatch } from "react-redux";
import { SET_ERROR, SET_LOADER } from "../store/formDataSlice";
import { SET_AUTH_DATA, LOGIN } from "../store/authSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

WebBrowser.maybeCompleteAuthSession();
export const googleAuth = ({
  navigation,
  type,
}: {
  navigation: NativeStackNavigationProp<any>;
  type: "signin" | "signup";
}) => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId:
        "160143197385-rde403fg94dhhkdp5dvi0dcg880i5rv9.apps.googleusercontent.com",
      androidClientId:
        "160143197385-h5133ippi9rii4g5k4ie35on8sdgpqfu.apps.googleusercontent.com",
      iosClientId:
        "160143197385-25u08jo30amjroc35o81bfnn2nr44r8l.apps.googleusercontent.com",
    },
    {
      projectNameForProxy: "@4geehub/4geehub",
      useProxy: true,
    }
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication) {
        dispatch(SET_LOADER(true));
        googleSignIn(
          authentication.accessToken,
          (response) => {
            dispatch(SET_LOADER(false));
            if (type === "signin") {
              if (response.data.status === "ACTIVE") {
                dispatch(SET_AUTH_DATA(response.data));
                dispatch(LOGIN());
              } else {
                navigation.navigate("VerifyEmail");
              }
            } else {
              navigation.navigate("SignIn");
            }
          },
          (error) => {
            dispatch(SET_LOADER(false));
            dispatch(SET_ERROR(error));
          }
        );
      }
    }
  }, [response]);

  return { promptAsync };
};
