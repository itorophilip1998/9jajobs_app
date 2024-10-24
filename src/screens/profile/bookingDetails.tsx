import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import { Button, PrimaryText, SmallText, Spacer } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import moment from "moment";
import { COLORS } from "../../utility/colors";
import {
  DelayFor,
  FirstLetterUppercase,
  convertTo12HourFormat,
} from "../../utility/helpers";
import ReviewIcon from "../../../assets/icons/review.svg";
import ChatIcon from "../../../assets/icons/chat.svg";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { shadowBoxDark } from "../../style/Typography";
import ErrorVerifyModalContent from "../../components/errorVerifyModalContent";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { updateBooking } from "../../api/booking";

// [{"created_at": "2024-01-15T10:28:21.000000Z", "date": "2024-01-09", "id": 26, "listing_id": 214, "listings": {"id":
// 214, "listing_address": "Port Harcourt, Rivers, Nigeria", "listing_featured_photo": "https://Sabifix.sfo3.digitaloceanspaces.com/uploads/listing_featured_photos/", "listing_name": "luxelook", "listing_phone": "07041528380", "rate_star": 0, "verified": null}, "status": "pending", "time": "07:00:00", "updated_at": "2024-01-15T10:28:21.000000Z", "user_id": 525}]

const BookingDetails = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const { darkMode } = useSelector((state: RootState) => state.auth);

  const updateStatus = (
    status: "pending" | "completed" | "cancelled" | "accepted" | "declined"
  ) => {
    dispatch(SET_LOADER(true));
    updateBooking(
      { status, booking_id: route.params?.data?.id },
      (response) => {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        if (status === "completed") {
          navigation.navigate("RateBooking", {
            data: route.params?.data,
            two_step: true,
          });
        } else {
          navigation.goBack();
        }
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
      <SafeAreaView edges={["top"]} className="flex-1 w-full">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-3 bg-[#0f0f0f]"
        >
          <TitleWithButton
            title="Booking Information"
            fire={() => navigation.goBack()}
          />
        </View>
        <ScrollView className="w-full flex-1 px-3">
          {route.params?.client &&
            route.params?.data?.status === "completed" && (
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-left p-0 text-[18px] text-[#696969] mb-4 mt-5"
              >
                Congratulations on your completed Service
              </SmallText>
            )}
          <SmallText
            style={{ color: darkMode ? COLORS.primary : "#0F0F0F" }}
            className="text-center text-[22px] font-RedHatDisplayRegular text-primary"
          >
            {route.params?.data?.listings?.listing_name}
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
              {moment(route.params?.data.created_at).format("DD/MM/YYYY")}
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
              {convertTo12HourFormat(route.params?.data.time)}
            </SmallText>
          </View>
          {route.params?.client ? (
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
                {route.params?.data?.listings?.user?.name}
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
                {route.params?.data?.user?.name}
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
            <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
              {route.params?.data?.location || "N/A"}
            </SmallText>
          </View>
          {route.params?.client ? (
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
              <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                {route.params?.data?.listings?.listing_phone ||
                  route.params?.data?.listings?.user?.phone}
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
              <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px] w-[70%]">
                {route.params?.data?.user?.phone}
              </SmallText>
            </View>
          )}
          <View className="py-2 flex-row justify-between items-center">
            <View>
              <Pressable
                onPress={() =>
                  route.params?.client
                    ? navigation.navigate("RateBooking", {
                        data: route.params?.data,
                        two_step: false,
                      })
                    : Toast.show({
                        type: "error",
                        text1: "Only the client can drop a review",
                      })
                }
                className="flex-row items-center"
              >
                <ReviewIcon />
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 ml-2 text-[15px]"
                >
                  Drop Review
                </SmallText>
              </Pressable>
            </View>
            <View className="flex-row items-start">
              <Pressable
                onPress={() =>
                  route.params?.client
                    ? !route.params?.data?.listings?.listing_phone &&
                      !route.params?.data?.listings?.user?.phone
                      ? Toast.show({
                          type: "error",
                          text1: "This listing does not have a phone number.",
                        })
                      : Linking.openURL(
                          `tel:${
                            route.params?.data?.listings?.listing_phone.replace(
                              /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                              ""
                            ) ||
                            route.params?.data?.listings?.user?.phone.replace(
                              /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                              ""
                            )
                          }`
                        )
                    : !route.params?.data?.user?.phone
                    ? Toast.show({
                        type: "error",
                        text1: "This user does not have a phone number.",
                      })
                    : Linking.openURL(
                        `tel:${route.params?.data?.user?.phone.replace(
                          /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                          ""
                        )}`
                      )
                }
                className="flex-row items-center"
              >
                <Foundation name="telephone" size={28} color={COLORS.primary} />
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 ml-2 text-[15px]"
                >
                  Call
                </SmallText>
              </Pressable>
              <Pressable
                onPress={() =>
                  route.params?.client
                    ? route.params?.data?.listings?.user
                      ? navigation.navigate("Chat", {
                          data: route.params?.data?.listings?.user,
                        })
                      : Toast.show({
                          type: "error",
                          text1: "This listing does not have a user.",
                        })
                    : route.params?.data?.user
                    ? navigation.navigate("Chat", {
                        data: route.params?.data?.user,
                      })
                    : Toast.show({
                        type: "error",
                        text1: "This client does not have a profile.",
                      })
                }
                className="flex-row items-center ml-2"
              >
                <ChatIcon />
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                  className="text-[#696969] text-left p-0 ml-2 text-[15px]"
                >
                  Chat
                </SmallText>
              </Pressable>
            </View>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          {route.params?.client && route.params?.data?.status === "pending" && (
            <>
              <Button
                text="Modify Booking"
                buttonStyleClassName="rounded-lg"
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
                <SmallText style={{ color: darkMode ? "#fff" : "#0f0f0f" }}>
                  Cancel Booking
                </SmallText>
              </TouchableOpacity>
            </>
          )}
          {route.params?.client &&
            route.params?.data?.status === "accepted" && (
              <>
                <Button
                  text="Confirm and Rate"
                  buttonStyleClassName="rounded-lg"
                  buttonStyle={{ width: "100%", marginHorizontal: "auto" }}
                  onPress={() => updateStatus("completed")}
                />
                <TouchableOpacity
                  onPress={() => updateStatus("cancelled")}
                  style={shadowBoxDark}
                  className="mx-auto w-[100%] mt-5 border border-primary items-center py-3 rounded-lg"
                >
                  <SmallText style={{ color: darkMode ? "#fff" : "#0f0f0f" }}>
                    Cancel Booking
                  </SmallText>
                </TouchableOpacity>
              </>
            )}
          {!route.params?.client &&
            route.params?.data?.status === "pending" && (
              <>
                <View
                  className="w-[100%] mx-auto mt-8 rounded-lg"
                  style={shadowBoxDark}
                >
                  <Button
                    text="Accept Booking"
                    buttonStyleClassName="rounded-lg"
                    buttonStyle={{ width: "100%", marginHorizontal: "auto" }}
                    onPress={() => updateStatus("accepted")}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={shadowBoxDark}
                  className="mx-auto w-[100%] mt-5 border border-primary items-center py-3 rounded-lg"
                >
                  <SmallText style={{ color: darkMode ? "#fff" : "#0f0f0f" }}>
                    Decline Booking
                  </SmallText>
                </TouchableOpacity>
              </>
            )}
          {!route.params?.client &&
            route.params?.data?.status === "accepted" && (
              <Button
                text="Cancel Booking"
                buttonStyleClassName="rounded-lg"
                buttonStyle={{ width: "100%", marginHorizontal: "auto" }}
                onPress={() => updateStatus("cancelled")}
              />
            )}
          {route.params?.client &&
            route.params?.data?.status === "accepted" && (
              <>
                <View className="flex-1" />
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-left p-0 text-[15px] text-[#696969] mb-2 mt-5"
                >
                  Note: Do not confirm a booking until the service is rendered
                  and completed.
                </SmallText>
              </>
            )}
        </ScrollView>
      </SafeAreaView>
      <ErrorVerifyModalContent
        message={{
          title: "Warning",
          message: `Do you want to Decline this Booking?`,
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
              DelayFor(500, () => updateStatus("declined"));
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

export default BookingDetails;
