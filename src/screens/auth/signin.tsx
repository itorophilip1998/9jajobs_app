import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

import React from "react";
import { width, height } from "../../utility/constant";
import logo from "../../../assets/images/logo.png";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Button,
  InputField,
  PrimaryText,
  SmallText,
  Spacer,
  Title,
} from "../../components";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { COLORS } from "../../utility/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_FULL_NAME,
  SET_PASSWORD,
  SET_PHONE_NUMBER,
  SET_REFERRAL_CODE,
} from "../../store/formDataSlice";
import GoogleLineSeperator from "../../components/googleLineSeperator";
import {
  VALIDATE_USER_DATA,
  validateEmail,
  validatePhone,
} from "../../utility/helpers";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

const Signin = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  // AUTH STATE AND PASSWORD VISIBILITY
  const [authState, setAuthState] = React.useState<"login" | "register">(
    "login"
  );
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const {
    fullName,
    confirmPassword,
    email,
    password,
    phoneNumber,
    referralCode,
  } = useSelector((state: RootState) => state.formData.authData);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  const dispatch = useDispatch();

  const validateSignIn = () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Address",
      });
    } else if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Password must not be less than 8 characters.",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Login successfully.",
      });
      navigation.navigate("TabNavigation");
    }
  };

  const validateSignUp = () => {
    VALIDATE_USER_DATA({ fullName, email, phoneNumber }, (e) => {
      if (!validateEmail(email)) {
        Toast.show({
          type: "error",
          text1: "Invalid Email Address",
        });
      } else if (!validatePhone(phoneNumber)) {
        Toast.show({
          type: "error",
          text1: "Phone number must be up to 11 characters.",
        });
      } else if (password.length < 8) {
        Toast.show({
          type: "error",
          text1: "Password must not be less than 8 characters.",
        });
      } else if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Passwords do not match.",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Signup successfully.",
        });
        navigation.navigate("TabNavigation");
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center px-4 bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#D4E1D2",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full"
      >
        <View className="flex-row justify-start items-center w-full pt-10">
          <Image source={logo} className="h-[60px] w-[60px]" />
          <Title
            className="!text-white ml-3"
            style={{ color: darkMode ? "white" : "black" }}
          >
            9jajob
          </Title>
        </View>
        <Spacer axis="vertical" value={H(12)} />
        <View className="flex-row items-center justify-between">
          <View
            style={{ backgroundColor: darkMode ? "#1E1E1E" : "white" }}
            className="w-[70%] bg-[#1E1E1E] ml-[15%] h-[48px] rounded-full flex-row justify-center overflow-hidden"
          >
            <TouchableOpacity
              className="w-[50%] justify-center items-center rounded-full"
              style={{
                backgroundColor: darkMode
                  ? authState === "login"
                    ? "#0F0F0F"
                    : "transparent"
                  : authState === "login"
                  ? COLORS.primary
                  : "transparent",
                borderWidth: darkMode
                  ? authState === "login"
                    ? 1
                    : 0
                  : authState === "login"
                  ? 0
                  : 0,
                borderColor: darkMode
                  ? authState === "login"
                    ? "#696969"
                    : "transparent"
                  : authState === "login"
                  ? "#696969"
                  : "transparent",
              }}
              onPress={() => setAuthState("login")}
            >
              {darkMode ? (
                <SmallText className="!text-[16px] !text-white">
                  Login
                </SmallText>
              ) : authState === "login" ? (
                <LinearGradient
                  className="w-[100%] justify-center items-center rounded-full h-full"
                  colors={["#023215", "#1A911B"]}
                >
                  <SmallText
                    style={{
                      color: authState === "login" ? "white" : "#696969",
                    }}
                    className="!text-[16px] !text-white"
                  >
                    Login
                  </SmallText>
                </LinearGradient>
              ) : (
                <SmallText
                  style={{
                    color: authState === "register" ? "#696969" : "white",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Login
                </SmallText>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[50%] justify-center items-center rounded-full"
              style={{
                backgroundColor: darkMode
                  ? authState === "register"
                    ? "#0F0F0F"
                    : "transparent"
                  : authState === "register"
                  ? COLORS.primary
                  : "transparent",
                borderWidth: darkMode
                  ? authState === "register"
                    ? 1
                    : 0
                  : authState === "register"
                  ? 0
                  : 0,
                borderColor: darkMode
                  ? authState === "register"
                    ? "#696969"
                    : "transparent"
                  : authState === "register"
                  ? "#696969"
                  : "transparent",
              }}
              onPress={() => setAuthState("register")}
            >
              {darkMode ? (
                <SmallText className="!text-[16px] !text-white">
                  Signup
                </SmallText>
              ) : authState === "register" ? (
                <LinearGradient
                  className="w-[100%] justify-center items-center rounded-full h-full"
                  colors={["#023215", "#1A911B"]}
                >
                  <SmallText
                    style={{
                      color: authState === "register" ? "white" : "#696969",
                    }}
                    className="!text-[16px] !text-white"
                  >
                    Signup
                  </SmallText>
                </LinearGradient>
              ) : (
                <SmallText
                  style={{
                    color: authState === "login" ? "#696969" : "white",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Signup
                </SmallText>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Spacer axis="vertical" value={H(5)} />
        {authState === "login" ? (
          <>
            <InputField
              onTextChange={(value) => dispatch(SET_EMAIL(value))}
              defaultValue={email}
              placeholder="Email Address"
              placeholderTextColor={darkMode ? "white" : "black"}
              type={"email-address"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
            />
            <Spacer axis="vertical" value={H(3)} />
            <InputField
              onTextChange={(value) => dispatch(SET_PASSWORD(value))}
              defaultValue={password}
              placeholder="Enter Password"
              type={"default"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
              secure={!visible}
              suffixIcon={
                <Feather
                  name={visible ? "eye-off" : "eye"}
                  size={20}
                  color="#626262"
                />
              }
              onSuffixTap={() => setVisible(!visible)}
            />
            <Spacer axis="vertical" value={H(2)} />
            <View className="w-full items-end">
              <PrimaryText
                className="!text-[#626262]"
                onPress={function (): void {
                  Linking.openURL(
                    "https://9jajob.com/customer/forget-password"
                  );
                }}
              >
                Forgot Password?
              </PrimaryText>
            </View>
            <Spacer axis="vertical" value={H(2)} />
            <Button
              text="Login"
              onPress={validateSignIn}
              textStyleClassName="text-[18px]"
            />
          </>
        ) : (
          <>
            <InputField
              onTextChange={(value) => dispatch(SET_FULL_NAME(value))}
              defaultValue={fullName}
              placeholder="Full Name"
              type={"default"}
              autoCapitalize={"words"}
              className="border-[#626262] border-b rounded-none p-0"
            />
            <Spacer axis="vertical" value={H(3)} />
            <InputField
              onTextChange={(value) => dispatch(SET_EMAIL(value))}
              defaultValue={email}
              placeholder="Email Address"
              type={"email-address"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
            />
            <Spacer axis="vertical" value={H(3)} />
            <InputField
              onTextChange={(value) => dispatch(SET_PHONE_NUMBER(value))}
              defaultValue={phoneNumber}
              placeholder="Phone Number"
              type={"numeric"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
            />
            <Spacer axis="vertical" value={H(3)} />
            <InputField
              onTextChange={(value) => dispatch(SET_REFERRAL_CODE(value))}
              defaultValue={referralCode}
              placeholder="Referral Code"
              type={"default"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
            />
            <Spacer axis="vertical" value={H(3)} />
            <InputField
              onTextChange={(value) => dispatch(SET_PASSWORD(value))}
              defaultValue={password}
              placeholder="Password"
              type={"default"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
              secure={!visible1}
              suffixIcon={
                <Feather
                  name={visible1 ? "eye-off" : "eye"}
                  size={20}
                  color="#626262"
                />
              }
              onSuffixTap={() => setVisible1(!visible1)}
            />
            <Spacer axis="vertical" value={H(3)} />
            <InputField
              onTextChange={(value) => dispatch(SET_CONFIRM_PASSWORD(value))}
              defaultValue={confirmPassword}
              placeholder="Confirm Password"
              type={"default"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0"
              secure={!visible2}
              suffixIcon={
                <Feather
                  name={visible2 ? "eye-off" : "eye"}
                  size={20}
                  color="#626262"
                />
              }
              onSuffixTap={() => setVisible2(!visible2)}
            />
            <Spacer axis="vertical" value={H(2)} />
            <Button
              text="Signup"
              onPress={validateSignUp}
              textStyleClassName="text-[18px]"
            />
          </>
        )}
        <Spacer axis="vertical" value={H(7)} />
        <GoogleLineSeperator />
        <Spacer axis="vertical" value={H(7)} />
        <View className="items-center flex-row justify-center">
          <Ionicons
            name="logo-google"
            size={30}
            color={COLORS.primary}
            style={{ marginHorizontal: 10 }}
          />
          <Ionicons
            name="md-logo-twitter"
            size={30}
            color={COLORS.primary}
            style={{ marginHorizontal: 10 }}
          />
          <Ionicons
            name="ios-logo-facebook"
            size={30}
            color={COLORS.primary}
            style={{ marginHorizontal: 10 }}
          />
        </View>
        <Spacer axis="vertical" value={H(4)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signin;
