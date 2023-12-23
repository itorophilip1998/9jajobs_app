import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  BackHandler,
} from "react-native";

import React from "react";
import { width, height } from "../../utility/constant";
import logo from "../../../assets/images/logo.png";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
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
  SET_ERROR,
  SET_FULL_NAME,
  SET_LOADER,
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
import { forgot, signIn, signUp, verifyAndReset } from "../../api/auth";
import { LOGIN, SET_TOKEN } from "../../store/authSlice";
import { RouteProp } from "@react-navigation/native";

const Forgot = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirm_password, setConfirmPassword] = React.useState<string>("");
  const [passedEmail, setPassedEmail] = React.useState<boolean>(false);
  const [visible1, setVisible1] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const validateForgotEmail = () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Address",
      });
    } else {
      dispatch(SET_LOADER(true));
      forgot(
        { email },
        (response) => {
          console.log(response);
          setPassedEmail(true);
          Toast.show({
            type: "success",
            text1: response.message,
          });
          dispatch(SET_LOADER(false));
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
          dispatch(SET_LOADER(false));
        }
      );
    }
  };

  const validateOtpAndPassword = () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Address",
      });
    } else if (token.length !== 5) {
      Toast.show({
        type: "error",
        text1: "OTP must be 5 digits.",
      });
    } else if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Password must not be less than 8 characters.",
      });
    } else if (password !== confirm_password) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
      });
    } else {
      dispatch(SET_LOADER(true));
      verifyAndReset(
        { email, otp: token, password, re_password: confirm_password },
        (response) => {
          console.log("verfy-and-reset", response);
          Toast.show({
            type: "success",
            text1: response.message,
          });
          navigation.goBack();
          dispatch(SET_LOADER(false));
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
          dispatch(SET_LOADER(false));
        }
      );
    }
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
          {/* <Image source={logo} className="h-[60px] w-[60px]" /> */}
          <Title
            // className="!text-white ml-3 font-RedHatDisplayBold"
            className="!text-white font-RedHatDisplayBold"
            style={{ color: darkMode ? "white" : "black" }}
          >
            9JAJOB
          </Title>
        </View>
        <Spacer axis="vertical" value={H(12)} />
        <View className="flex-row items-center justify-center">
          <Title
            // className="!text-white ml-3 font-RedHatDisplayBold"
            className="!text-white font-RedHatDisplayBold"
            style={{ color: darkMode ? "white" : "black" }}
          >
            Forgot Password
          </Title>
        </View>
        <Spacer axis="vertical" value={H(5)} />

        <InputField
          onTextChange={(value) => setEmail(value)}
          defaultValue={email}
          placeholder="Email Address"
          type={"email-address"}
          autoCapitalize={"none"}
          containerClassName="border-[#626262] border rounded-full"
          suffixIcon={
            <FontAwesome name="send" size={19} color={COLORS.primary} />
          }
          onSuffixTap={validateForgotEmail}
        />
        <Spacer axis="vertical" value={H(2)} />
        {passedEmail && (
          <>
            <InputField
              onTextChange={(value) => setToken(value)}
              defaultValue={token}
              placeholder="Enter OTP"
              type={"numeric"}
              autoCapitalize={"none"}
              className="border-[#626262] border rounded-full"
            />
            {token.length > 0 && (
              <>
                <Spacer axis="vertical" value={H(2)} />
                <InputField
                  onTextChange={(value) => setPassword(value)}
                  defaultValue={password}
                  placeholder="Enter Password"
                  type={"default"}
                  autoCapitalize={"none"}
                  className="border-[#626262] border rounded-full"
                  secure={!visible}
                  suffixIcon={
                    <Feather
                      name={visible ? "eye-off" : "eye"}
                      size={19}
                      color="#626262"
                    />
                  }
                  onSuffixTap={() => setVisible(!visible)}
                />
                <Spacer axis="vertical" value={H(2)} />
                <InputField
                  onTextChange={(value) => setConfirmPassword(value)}
                  defaultValue={confirm_password}
                  placeholder="Confirm Password"
                  type={"default"}
                  autoCapitalize={"none"}
                  className="border-[#626262] border rounded-full"
                  secure={!visible1}
                  suffixIcon={
                    <Feather
                      name={visible1 ? "eye-off" : "eye"}
                      size={19}
                      color="#626262"
                    />
                  }
                  onSuffixTap={() => setVisible1(!visible1)}
                />
              </>
            )}
            <Spacer axis="vertical" value={H(2)} />
            <Button
              text="Send"
              onPress={validateOtpAndPassword}
              textStyleClassName="text-[18px]"
            />
          </>
        )}
        <Spacer axis="vertical" value={H(4)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Forgot;
