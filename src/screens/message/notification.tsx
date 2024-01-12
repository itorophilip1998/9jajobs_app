import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { Button, SmallText } from "../../components";
import moment from "moment";
import { shadowBox, shadowBoxDark } from "../../style/Typography";
import { AntDesign } from "@expo/vector-icons";
import ErrorVerifyModalContent from "../../components/errorVerifyModalContent";
import { COLORS } from "../../utility/colors";
import { DelayFor } from "../../utility/helpers";

const Notification = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const { darkMode } = useSelector((state: RootState) => state.auth);
  // console.log(route.params?.data);

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
      <SafeAreaView edges={["top"]} className="flex-1 w-full h-full mb-1">
        <View
          style={[{ backgroundColor: darkMode ? "black" : "#FFFFFF" }]}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-3 bg-[#0f0f0f]"
        >
          <TitleWithButton
            title={"Notification"}
            fire={() => navigation.goBack()}
          />
        </View>
        <ScrollView
          className="pt-4 px-3"
          style={{ backgroundColor: darkMode ? "#0F0F0F" : "#D4E1D2" }}
        >
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
            className="text-right p-0 text-[14px] text-[#696969] mb-2"
          >
            {moment(route.params?.data.created_at).format("DD/MM/YYYY")}
          </SmallText>
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
            className="text-left p-0 text-[14px] text-[#696969]"
          >
            {route.params?.data.message}
          </SmallText>
          <View
            className="w-[80%] mx-auto mt-8 rounded-lg"
            style={shadowBoxDark}
          >
            <Button
              text="Accept Booking"
              buttonStyleClassName="rounded-lg"
              buttonStyle={{ width: "100%", marginHorizontal: "auto" }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={shadowBoxDark}
            className="mx-auto w-[80%] mt-5 border border-primary items-center py-3 rounded-lg"
          >
            <SmallText style={{ color: darkMode ? "#fff" : "#0f0f0f" }}>
              Decline Booking
            </SmallText>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <ErrorVerifyModalContent
        message={{
          title: "Warning",
          message: `Do you want to Decline Booking?`,
        }}
        color={COLORS.danger}
        visible={modalVisible}
        icon={<AntDesign name="warning" size={24} color={COLORS.danger} />}
      >
        <View className="flex-row justify-between items-center">
          <Button
            text="Yes"
            buttonStyle={{ width: W("36%"), marginRight: W("3%") }}
            // buttonStyleClassName="bg-[#C93636]"
            onPress={() => {
              setModalVisible(false);
              // DelayFor(500, submit);
            }}
          />
          <Button
            text="No"
            buttonStyle={{ width: W("36%") }}
            // buttonStyleClassName="bg-transparent border border-[#C3B9B9]"
            // textStyleClassName="text-[#212121]"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </ErrorVerifyModalContent>
    </KeyboardAvoidingView>
  );
};

export default Notification;
