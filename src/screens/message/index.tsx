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

const Message = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [type, setType] = React.useState<"message" | "notification">("message");
  //   const sortRef = React.useState<RBSheet | null>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <View className="relative flex flex-row items-center w-full justify-center px-3 py-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-3"
          >
            <Feather name="arrow-left-circle" size={30} color={"#696969"} />
          </Pressable>
          <View className="flex-row items-center justify-between">
            <View className="w-[83%] bg-[#1E1E1E] mx-auto h-[48px] rounded-full flex-row justify-center overflow-hidden">
              <TouchableOpacity
                className="w-[50%] justify-center items-center rounded-full"
                style={{
                  backgroundColor: type !== "message" ? "#1E1E1E" : "#00000057",
                }}
                onPress={() => setType("message")}
              >
                <SmallText
                  className="!text-[16px] !text-white"
                  style={{ color: type === "message" ? "#1A911B" : "#696969" }}
                >
                  Messages
                </SmallText>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[50%] justify-center items-center rounded-full"
                style={{
                  backgroundColor:
                    type !== "notification" ? "#1E1E1E" : "#00000057",
                }}
                onPress={() => setType("notification")}
              >
                <SmallText
                  className="!text-[16px] !text-white"
                  style={{
                    color: type === "notification" ? "#1A911B" : "#696969",
                  }}
                >
                  Notification
                </SmallText>
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
