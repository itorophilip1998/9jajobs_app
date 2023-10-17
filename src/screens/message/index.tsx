import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import { Feather } from "@expo/vector-icons";
import { SmallText } from "../../components";
import MessageSection from "./messageSection";
import NotificationSection from "./notificationSection";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { COLORS } from "../../utility/colors";
import { LinearGradient } from "expo-linear-gradient";

const Message = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [type, setType] = React.useState<"message" | "notification">("message");
  const { darkMode } = useSelector((state: RootState) => state.auth);
  //   const sortRef = React.useState<RBSheet | null>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#D4E1D2",
      }}
    >
      <SafeAreaView className="flex-1 w-full">
        <View className="relative flex flex-row items-center w-full justify-center px-3 py-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-3"
          >
            <Feather name="arrow-left-circle" size={30} color={"#696969"} />
          </Pressable>
          <View className="flex-row items-center justify-between">
            <View
              style={{ backgroundColor: darkMode ? "#1E1E1E" : "white" }}
              className="w-[83%] bg-[#1E1E1E] mx-auto h-[48px] rounded-full flex-row justify-center overflow-hidden"
            >
              <TouchableOpacity
                className="w-[50%] justify-center items-center rounded-full"
                style={{
                  backgroundColor: darkMode
                    ? type !== "message"
                      ? "#1E1E1E"
                      : "#00000057"
                    : type !== "message"
                    ? "transparent"
                    : "transparent",
                }}
                onPress={() => setType("message")}
              >
                {darkMode ? (
                  <SmallText
                    className="!text-[16px] !text-white"
                    style={{
                      color: type === "message" ? "#1A911B" : "#696969",
                    }}
                  >
                    Messages (12)
                  </SmallText>
                ) : type === "message" ? (
                  <LinearGradient
                    className="w-[100%] justify-center items-center rounded-full h-full"
                    colors={["#023215", "#1A911B"]}
                  >
                    <SmallText
                      style={{
                        color: type === "message" ? "white" : "#696969",
                      }}
                      className="!text-[16px] !text-white"
                    >
                      Messages (12)
                    </SmallText>
                  </LinearGradient>
                ) : (
                  <SmallText
                    className="!text-[16px] !text-white"
                    style={{
                      color: type === "notification" ? "#696969" : "#1A911B",
                    }}
                  >
                    Messages (12)
                  </SmallText>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[50%] justify-center items-center rounded-full"
                style={{
                  backgroundColor: darkMode
                    ? type !== "notification"
                      ? "#1E1E1E"
                      : "#00000057"
                    : type !== "notification"
                    ? "transparent"
                    : "transparent",
                }}
                onPress={() => setType("notification")}
              >
                {darkMode ? (
                  <SmallText
                    className="!text-[16px] !text-white"
                    style={{
                      color: type === "notification" ? "#1A911B" : "#696969",
                    }}
                  >
                    Notification(24)
                  </SmallText>
                ) : type === "notification" ? (
                  <LinearGradient
                    className="w-[100%] justify-center items-center rounded-full h-full"
                    colors={["#023215", "#1A911B"]}
                  >
                    <SmallText
                      style={{
                        color: type === "notification" ? "white" : "#696969",
                      }}
                      className="!text-[16px] !text-white"
                    >
                      Notification(24)
                    </SmallText>
                  </LinearGradient>
                ) : (
                  <SmallText
                    className="!text-[16px] !text-white"
                    style={{
                      color: type === "message" ? "#696969" : "#1A911B",
                    }}
                  >
                    Notification(24)
                  </SmallText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {type === "message" && <MessageSection navigation={navigation} />}
        {type === "notification" && <NotificationSection />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Message;
