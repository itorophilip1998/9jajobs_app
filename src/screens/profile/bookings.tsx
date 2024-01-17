import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacer, SmallText, Loader, Button } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SET_LOADER } from "../../store/formDataSlice";
import { bookListing, getAllBookings } from "../../api/booking";
import Toast from "react-native-toast-message";
import moment from "moment";
import { GradientText } from "../../components/gradientText";
import { FirstLetterUppercase } from "../../utility/helpers";

const Booked = ({
  booked,
  navigation,
}: {
  booked?: any[];
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full">
      <View className="mb-3 flex-row items-center">
        <SmallText className="text-primary text-[16px] text-left p-0 pr-2">
          Pending Booking
        </SmallText>
        <View className="border-[0.5px] border-primary flex-1" />
      </View>
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Booking Details
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date booked
        </SmallText>
      </View>

      {booked
        ?.filter((item, idx) => item.status.toLowerCase() === "pending")
        .map((item, idx) => (
          <Pressable
            onPress={() =>
              navigation.navigate("BookingDetails", {
                data: item,
                client: true,
              })
            }
            key={idx}
            className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]"
          >
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {FirstLetterUppercase(item.listings.listing_name || "")}
            </SmallText>
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {moment(item.date).format("DD/MM/YYYY")}
            </SmallText>
          </Pressable>
        ))}
      <View className="mb-3 mt-5 flex-row items-center">
        <SmallText className="text-primary text-[16px] text-left p-0 pr-2">
          Accepted Booking
        </SmallText>
        <View className="border-[0.5px] border-primary flex-1" />
      </View>
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Booking Details
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date booked
        </SmallText>
      </View>

      {booked
        ?.filter((item, idx) => item.status.toLowerCase() === "accepted")
        .map((item, idx) => (
          <Pressable
            onPress={() =>
              navigation.navigate("BookingDetails", {
                data: item,
                client: true,
              })
            }
            key={idx}
            className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]"
          >
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {FirstLetterUppercase(item.listings.listing_name || "")}
            </SmallText>
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {moment(item.date).format("DD/MM/YYYY")}
            </SmallText>
          </Pressable>
        ))}
      <View className="mb-3 mt-5 flex-row items-center">
        <SmallText className="text-primary text-[16px] text-left p-0 pr-2">
          Declined Booking
        </SmallText>
        <View className="border-[0.5px] border-primary flex-1" />
      </View>
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Booking Details
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date booked
        </SmallText>
      </View>

      {booked
        ?.filter((item, idx) => item.status.toLowerCase() === "declined")
        .map((item, idx) => (
          <Pressable
            onPress={() =>
              navigation.navigate("BookingDetails", {
                data: item,
                client: true,
              })
            }
            key={idx}
            className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]"
          >
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {FirstLetterUppercase(item.listings.listing_name || "")}
            </SmallText>
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {moment(item.date).format("DD/MM/YYYY")}
            </SmallText>
          </Pressable>
        ))}
      <View className="mb-3 mt-5 flex-row items-center">
        <SmallText className="text-primary text-[16px] text-left p-0 pr-2">
          Cancelled Booking
        </SmallText>
        <View className="border-[0.5px] border-primary flex-1" />
      </View>
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Booking Details
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date booked
        </SmallText>
      </View>

      {booked
        ?.filter((item, idx) => item.status.toLowerCase() === "cancelled")
        .map((item, idx) => (
          <Pressable
            onPress={() =>
              navigation.navigate("BookingDetails", {
                data: item,
                client: true,
              })
            }
            key={idx}
            className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]"
          >
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {FirstLetterUppercase(item.listings.listing_name || "")}
            </SmallText>
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {moment(item.date).format("DD/MM/YYYY")}
            </SmallText>
          </Pressable>
        ))}
      <View className="mb-3 flex-row items-center mt-5">
        <SmallText className="text-primary text-[16px] text-left p-0 pr-2">
          Completed Booking
        </SmallText>
        <View className="border-[0.5px] border-primary flex-1" />
      </View>
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Booking Details
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date Completed
        </SmallText>
      </View>

      {booked
        ?.filter((item, idx) => item.status.toLowerCase() === "completed")
        .map((item, idx) => (
          <Pressable
            onPress={() =>
              navigation.navigate("BookingDetails", {
                data: item,
                client: true,
              })
            }
            key={idx}
            className="w-full flex-row justify-between  items-center py-3 border-t border-b-[#473F474D]"
          >
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {item.listings.listing_name} ({item.status})
            </SmallText>
            <SmallText className="text-[#6A6A6A] text-left p-0">
              {moment(item.date).format("DD/MM/YYYY")}
            </SmallText>
          </Pressable>
        ))}
    </View>
  );
};

const Booking = ({
  booking,
  navigation,
}: {
  booking?: any[];
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <View className="w-full">
      <View className="w-full flex-row justify-between  items-center pb-3">
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Client Name
        </SmallText>
        <SmallText
          style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
          className="text-[#D4E1D2] text-left p-0"
        >
          Date booked
        </SmallText>
      </View>
      {booking?.map((item, idx) => (
        <Pressable
          onPress={() => navigation.navigate("BookingDetails", { data: item })}
          key={idx}
          className="w-full flex-row justify-between  items-center py-3 border-t border-t-[#473F474D]"
        >
          <SmallText className="text-[#6A6A6A] text-left p-0">
            {FirstLetterUppercase(item.listings.listing_name || "")}
          </SmallText>
          <SmallText className="text-[#6A6A6A] text-left p-0">
            {moment(item.date).format("DD/MM/YYYY")}
          </SmallText>
        </Pressable>
      ))}
    </View>
  );
};

const Bookings = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [type, setType] = React.useState<"booked" | "booking">("booked");
  const [bookedlisting, setBookListing] = React.useState<{
    bookings: any[];
    booked: any[];
  } | null>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getAllBookings(
        (response) => {
          console.log(response.booked);
          dispatch(SET_LOADER(false));
          setLoaded(true);
          setBookListing(response);
        },
        (error) => {
          dispatch(SET_LOADER(false));
          setLoaded(true);
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    }
  }, [focus]);

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
      <SafeAreaView edges={["top"]} className="flex-1 w-full pb-4">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="Bookings" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View
          style={{ backgroundColor: darkMode ? "#1E1E1E" : "white" }}
          className="w-[80%] bg-[#1E1E1E] mx-auto h-[48px] rounded-full flex-row justify-center overflow-hidden"
        >
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: darkMode
                ? type !== "booked"
                  ? "#1E1E1E"
                  : "#00000057"
                : type !== "booked"
                ? "transparent"
                : "transparent",
            }}
            onPress={() => setType("booked")}
          >
            {darkMode ? (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booked" ? "#1A911B" : "#696969",
                }}
              >
                Booked
              </SmallText>
            ) : type === "booked" ? (
              <LinearGradient
                className="w-[100%] justify-center items-center rounded-full h-full"
                colors={["#023215", "#1A911B"]}
              >
                <SmallText
                  style={{
                    color: type === "booked" ? "white" : "#696969",
                  }}
                  className="!text-[16px] !text-white"
                >
                  Booked
                </SmallText>
              </LinearGradient>
            ) : (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booking" ? "#696969" : "#1A911B",
                }}
              >
                Booked
              </SmallText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[50%] justify-center items-center rounded-full"
            style={{
              backgroundColor: darkMode
                ? type !== "booking"
                  ? "#1E1E1E"
                  : "#00000057"
                : type !== "booking"
                ? "transparent"
                : "transparent",
            }}
            onPress={() => setType("booking")}
          >
            {darkMode ? (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booking" ? "#1A911B" : "#696969",
                }}
              >
                My Bookings
              </SmallText>
            ) : type === "booking" ? (
              <LinearGradient
                className="w-[100%] justify-center items-center rounded-full h-full"
                colors={["#023215", "#1A911B"]}
              >
                <SmallText
                  style={{
                    color: type === "booking" ? "white" : "#696969",
                  }}
                  className="!text-[16px] !text-white"
                >
                  My Bookings
                </SmallText>
              </LinearGradient>
            ) : (
              <SmallText
                className="!text-[16px] !text-white"
                style={{
                  color: type === "booked" ? "#696969" : "#1A911B",
                }}
              >
                My Bookings
              </SmallText>
            )}
          </TouchableOpacity>
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        {loaded ? (
          <>
            <ScrollView className="px-3 flex-1">
              {type === "booked" && (
                <Booked
                  navigation={navigation}
                  booked={bookedlisting?.bookings}
                />
              )}
              {type === "booking" && (
                <Booking
                  navigation={navigation}
                  booking={bookedlisting?.booked}
                />
              )}
            </ScrollView>
            <Spacer value={H("3%")} axis="vertical" />
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
              className="text-left p-0 text-[15px] px-3 text-[#696969] mb-2"
            >
              Endeavor to follow our booking guidelines{" "}
              <Text className="text-primary underline">guidelines link</Text>{" "}
              and also try to reach out to the client or service provider
              through phone calls or our chart page for more confirmations .
            </SmallText>
          </>
        ) : (
          <>
            <View
              className="flex-1 w-full h-full justify-center items-center"
              style={{ height: H("60%") }}
            >
              <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                Oops! No Booking Found
              </GradientText>
              <Spacer value={H("2%")} axis="vertical" />
              <Button
                text="Back to Menu"
                onPress={() => navigation.navigate("Profile")}
                buttonStyleClassName="rounded-md"
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Bookings;
