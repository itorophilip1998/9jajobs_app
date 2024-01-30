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
import { useDispatch, useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { Button, SmallText, Spacer } from "../../components";
import moment from "moment";
import { shadowBox, shadowBoxDark } from "../../style/Typography";
import { AntDesign } from "@expo/vector-icons";
import ErrorVerifyModalContent from "../../components/errorVerifyModalContent";
import { COLORS } from "../../utility/colors";
import {
  DelayFor,
  FirstLetterUppercase,
  convertTo12HourFormat,
} from "../../utility/helpers";
import Toast from "react-native-toast-message";
import { updateBooking } from "../../api/booking";
import { SET_LOADER } from "../../store/formDataSlice";

const Notification = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const updateStatus = (
    status: "pending" | "completed" | "cancelled" | "accepted" | "declined"
  ) => {
    dispatch(SET_LOADER(true));
    updateBooking(
      { status, booking_id: route.params?.data?.booking?.id },
      (response) => {
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
  };
  console.log(route.params?.data);

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
            title={route.params?.data?.title || "Notification"}
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
            {moment(route.params?.data?.created_at).format("DD/MM/YYYY")}
          </SmallText>
          {route.params?.data?.booking ? (
            <>
              <SmallText
                style={{ color: darkMode ? COLORS.primary : "#0F0F0F" }}
                className="text-center text-[22px] font-RedHatDisplayRegular text-primary"
              >
                {route.params?.data?.booking?.listings?.listing_name}
              </SmallText>
              <Spacer value={H("2%")} axis="vertical" />
              <View
                style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                className="py-2 flex-row justify-between items-center"
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
                  Date booked
                </SmallText>
                <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                  {moment(route.params?.data?.booking?.created_at).format(
                    "DD/MM/YYYY"
                  )}
                </SmallText>
              </View>
              <View
                style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                className="py-2 flex-row justify-between items-center"
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
                  Time
                </SmallText>
                <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                  {convertTo12HourFormat(route.params?.data?.booking?.time)}
                </SmallText>
              </View>
              {/* <View
                style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                className="py-2 flex-row justify-between items-center"
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
                  Status
                </SmallText>
                <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                  {FirstLetterUppercase(
                    route.params?.data?.booking?.status || ""
                  )}
                </SmallText>
              </View> */}
              {profile?.id === route.params?.data?.bookings?.user?.id ? (
                <View
                  style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                  className="py-2 flex-row justify-between items-center"
                >
                  <SmallText
                    style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                    className="text-[#696969] text-left p-0 text-[15px]"
                  >
                    Service Provider
                  </SmallText>
                  <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                    {route.params?.data?.booking?.listings?.user?.name}
                  </SmallText>
                </View>
              ) : (
                <View
                  style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                  className="py-2 flex-row justify-between items-center"
                >
                  <SmallText
                    style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                    className="text-[#696969] text-left p-0 text-[15px]"
                  >
                    Service Receiver
                  </SmallText>
                  <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                    {route.params?.data?.booking?.user?.name}
                  </SmallText>
                </View>
              )}
              <View
                style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                className="py-2 flex-row justify-between items-center"
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 text-[15px]"
                >
                  Address
                </SmallText>
                <SmallText
                  numberOfLine={1}
                  className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]"
                >
                  {route.params?.data?.booking?.location || "N/A"}
                </SmallText>
              </View>
              {profile?.id === route.params?.data?.booking?.user?.id ? (
                <View
                  style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                  className="py-2 flex-row justify-between items-center"
                >
                  <SmallText
                    style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                    className="text-[#696969] text-left p-0 text-[15px]"
                  >
                    Phone
                  </SmallText>
                  <SmallText
                    numberOfLine={1}
                    className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]"
                  >
                    {route.params?.data?.booking?.listings?.listing_phone ||
                      route.params?.data?.booking?.listings?.user?.phone ||
                      "N/A"}
                  </SmallText>
                </View>
              ) : (
                <View
                  style={{ borderTopColor: darkMode ? "#0F0F0F" : "#69696926" }}
                  className="py-2 flex-row justify-between items-center"
                >
                  <SmallText
                    style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                    className="text-[#696969] text-left p-0 text-[15px]"
                  >
                    Phone
                  </SmallText>
                  <SmallText
                    numberOfLine={1}
                    className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]"
                  >
                    {route.params?.data?.booking?.user?.phone || "N/A"}
                  </SmallText>
                </View>
              )}
              {profile?.id !== route.params?.data?.booking?.user?.id &&
                route.params?.data?.booking?.status === "pending" && (
                  <>
                    <View
                      className="w-[100%] mx-auto mt-8 rounded-lg"
                      style={shadowBoxDark}
                    >
                      <Button
                        text="Accept Booking"
                        buttonStyleClassName="rounded-lg"
                        buttonStyle={{
                          width: "100%",
                          marginHorizontal: "auto",
                        }}
                        onPress={() => updateStatus("accepted")}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      style={shadowBoxDark}
                      className="mx-auto w-[100%] mt-5 border border-primary items-center py-3 rounded-lg"
                    >
                      <SmallText
                        style={{ color: darkMode ? "#fff" : "#0f0f0f" }}
                      >
                        Decline Booking
                      </SmallText>
                    </TouchableOpacity>
                  </>
                )}
              {profile?.id === route.params?.data?.booking?.user?.id &&
                route.params?.data?.booking?.status === "pending" && (
                  <>
                    <Button
                      text="Modify Booking"
                      buttonStyleClassName="rounded-lg mt-8"
                      buttonStyle={{ width: "100%", marginHorizontal: "auto" }}
                      onPress={() =>
                        navigation.navigate("ModifyBooking", {
                          data: route.params?.data,
                        })
                      }
                    />
                    <TouchableOpacity
                      onPress={() => updateStatus("cancelled")}
                      style={shadowBoxDark}
                      className="mx-auto w-[100%] mt-5 border border-primary items-center py-3 rounded-lg"
                    >
                      <SmallText
                        style={{ color: darkMode ? "#fff" : "#0f0f0f" }}
                      >
                        Cancel Booking
                      </SmallText>
                    </TouchableOpacity>
                  </>
                )}
            </>
          ) : (
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
              className="text-left p-0 text-[14px] text-[#696969]"
            >
              {route.params?.data?.message}
            </SmallText>
          )}
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
