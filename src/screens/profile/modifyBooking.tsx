import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, SmallText } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { COLORS } from "../../utility/colors";
import { FONTS } from "../../utility/fonts";
import { DatePicker, TimePicker } from "../../components/datePicker";
import moment from "moment";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { updateBooking } from "../../api/booking";

const ModifyBooking = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const [date, setDate] = React.useState<string>(
    moment(route.params?.data.created_at).format("YYYY-MM-DD")
  );
  const [isDate, setDateActive] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>(
    route.params?.data?.location || ""
  );
  const [locationFocus, setLocationFocus] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<string>(
    route.params?.data?.time || ""
  );
  const [isTime, setTimeActive] = React.useState<boolean>(false);
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLocation(route.params?.data?.location || "");
  }, [route.params?.data]);

  const validate = () => {
    if (!date) {
      Toast.show({
        type: "error",
        text1: "Date is required",
      });
    } else if (!time) {
      Toast.show({
        type: "error",
        text1: "Time is required",
      });
    } else if (!location) {
      Toast.show({
        type: "error",
        text1: "Location is required",
      });
    } else {
      dispatch(SET_LOADER(true));
      updateBooking(
        {
          booking_id: route.params?.data?.id,
          status: route.params?.data?.status,
          date,
          location,
          time,
          modify: true,
        },
        (response) => {
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "success",
            text1: response?.message,
          });
          navigation.pop(2);
        },
        (error) => {
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    }
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
            title="Modify Booking"
            fire={() => navigation.goBack()}
          />
        </View>
        <View className="w-full flex-1 px-3">
          <View className="py-2 flex-row justify-between items-center">
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#696969] text-center p-0 mr-3 text-[15px] w-[20%]"
            >
              Date
            </SmallText>
            <View className="flex-1">
              <DatePicker
                date={date}
                isDate={isDate}
                className="rounded-full bg-[#0f0f0f]"
                setDate={setDate}
                setDateActive={setDateActive}
              />
            </View>
          </View>
          <View className="py-2 flex-row justify-between items-center">
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#696969] text-center p-0 mr-3 w-[20%] text-[15px]"
            >
              Time
            </SmallText>
            <View className="flex-1">
              <TimePicker
                isTime={isTime}
                className="rounded-full bg-[#0f0f0f]"
                setTime={setTime}
                setTimeActive={setTimeActive}
                time={time}
              />
            </View>
          </View>
          <View className="py-2 flex-row justify-between items-start">
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#696969] text-center p-0 mr-3 text-[15px] w-[20%] mt-[15px]"
            >
              Location
            </SmallText>
            <GooglePlacesAutocomplete
              placeholder="Search location"
              enableHighAccuracyLocation
              debounce={400}
              textInputProps={{
                placeholderTextColor: darkMode ? "#c6c6c6" : "#000",
                value: location,
                onChangeText: (text) => {
                  setLocation(text);
                },
                onFocus: () => {
                  setLocationFocus(true);
                },
                onBlur: () => {
                  setLocationFocus(false);
                },
              }}
              onPress={(data, details = null) => {
                setLocation(details?.formatted_address || "");
              }}
              query={{
                key: "AIzaSyC6yqP8_qWQsmhyqkSrAgTm7CUQ6yHwzRY",
                language: "en",
                components: "country:NG",
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}
              renderRow={(rowData) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Ionicons
                    name="ios-location-sharp"
                    size={24}
                    color={COLORS.primary}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.RedHatDisplayRegular,
                      color: "#0f0f0f",
                    }}
                  >
                    {rowData.description}
                  </Text>
                </View>
              )}
              styles={{
                textInput: {
                  fontFamily: FONTS.RedHatDisplayRegular,
                  backgroundColor: darkMode ? "#0f0f0f" : "white",
                  color: darkMode ? "#c6c6c6" : "#0f0f0f",
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: locationFocus ? COLORS.primary : "#696969",
                  height: 50,
                },
              }}
            />
          </View>
          <Button
            text="Update Booking"
            buttonStyle={{ width: "100%", marginTop: 10 }}
            onPress={validate}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ModifyBooking;
