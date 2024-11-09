import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Button, InputField, SmallText, Spacer } from "../../components";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { shadowBoxDark } from "../../style/Typography";
import BorderBottom from "../../components/borderBottom";
import { COLORS } from "../../utility/colors";
import { GradientText } from "../../components/gradientText";
import { validateEmail, validatePhone } from "../../utility/helpers";
import Toast from "react-native-toast-message";
import { SET_LOADER } from "../../store/formDataSlice";
import { sendContactForm } from "../../api/user";

const Contact = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [message, setMessage] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const dispatch = useDispatch();
  const { darkMode, lat, lng } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.auth);
  const validate = () => {
    if (!name) {
      Toast.show({
        type: "error",
        text1: "Name is required.",
      });
    } else if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Email is Invalid.",
      });
    } else if (!validatePhone(phone, 11)) {
      Toast.show({
        type: "error",
        text1: "Phone number must be 11 digits",
      });
    } else if (!message) {
      Toast.show({
        type: "error",
        text1: "Message is required.",
      });
    } else {
      dispatch(SET_LOADER(true));
      sendContactForm(
        {
          name,
          email,
          phone,
          message,
        },
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
      <SafeAreaView className="flex-1 w-full">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="Contact" fire={() => navigation.goBack()} />
        </View>
        <ScrollView className="w-full flex-1 px-3">
          <MapView
            onPress={() => {
              navigation.navigate("ContactMap", {
                data: {
                  name: data?.contact?.business_name,
                  lng: data?.contact?.coordinates?.lng,
                  lat: data?.contact?.coordinates?.lat,
                },
              });
            }}
            className="flex-1 w-full h-[200px]"
            style={[shadowBoxDark]}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: data?.contact.coordinates.lat,
              longitude: data?.contact.coordinates.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: data?.contact.coordinates.lat,
                longitude: data?.contact.coordinates.lng,
              }}
              title={data?.contact.business_name}
            />
          </MapView>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="py-3 w-full">
            <View className="flex-row items-center">
              <MaterialIcons
                name="location-pin"
                size={24}
                color={COLORS.primary}
              />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
                className="font-RedHatDisplaySemiBold text-[18px] ml-1 p-0 text-left"
              >
                Address
              </SmallText>
            </View>
            {data?.contact.address.map((item: any, idx: number) => (
              <SmallText
                key={idx}
                style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
                className="font-RedHatDisplayRegular text-[18px] text-left p-0"
              >
                {item}
              </SmallText>
            ))}
          </View>
          <BorderBottom />
          <View className="py-3 w-full">
            <View className="flex-row items-center">
              <MaterialIcons
                name="location-pin"
                size={24}
                color={COLORS.primary}
              />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
                className="font-RedHatDisplaySemiBold text-[18px] ml-1 p-0 text-left"
              >
                Email Address
              </SmallText>
            </View>
            {data?.contact.email.map((item: any, idx: number) => (
              <SmallText
                key={idx}
                onPress={() => Linking.openURL(`mailto:${item}`)}
                style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
                className="font-RedHatDisplayRegular text-[18px] text-left p-0"
              >
                {item}
              </SmallText>
            ))}
          </View>
          <BorderBottom />
          <View className="py-3 w-full">
            <View className="flex-row items-center">
              <MaterialIcons
                name="location-pin"
                size={24}
                color={COLORS.primary}
              />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
                className="font-RedHatDisplaySemiBold text-[18px] ml-1 p-0 text-left"
              >
                Phone
              </SmallText>
            </View>
            {data?.contact.phone.map((item: any, idx: number) => (
              <SmallText
                key={idx}
                onPress={() => Linking.openURL(`tel:${item}`)}
                style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
                className="font-RedHatDisplayRegular text-[18px] text-left p-0"
              >
                {item}
              </SmallText>
            ))}
          </View>
          <BorderBottom />
          <Spacer value={H("3%")} axis="vertical" />
          <GradientText className="text-[20px] font-RedHatDisplaySemiBold">
            Contact Form
          </GradientText>
          <Spacer value={H("2%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Name
          </SmallText>
          <Spacer axis="vertical" value={H(1)} />
          <InputField
            onTextChange={(value) => setName(value)}
            defaultValue={name}
            placeholder="Enter your  name here"
            containerStyle={{
              width: "100%",
              backgroundColor: darkMode ? "#0F0F0F" : "transparent",
            }}
            type={"default"}
            autoCapitalize={"sentences"}
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
          />
          <Spacer value={H("2%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Email Address
          </SmallText>
          <Spacer axis="vertical" value={H(1)} />
          <InputField
            onTextChange={(value) => setEmail(value)}
            defaultValue={email}
            placeholder="Enter your email address here"
            containerStyle={{
              width: "100%",
              backgroundColor: darkMode ? "#0F0F0F" : "transparent",
            }}
            type={"email-address"}
            autoCapitalize={"sentences"}
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
          />
          <Spacer value={H("2%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Phone Number
          </SmallText>
          <Spacer axis="vertical" value={H(1)} />
          <InputField
            onTextChange={(value) => setPhone(value)}
            defaultValue={phone}
            placeholder="Enter your phone number here"
            containerStyle={{
              width: "100%",
              backgroundColor: darkMode ? "#0F0F0F" : "transparent",
            }}
            type={"numeric"}
            autoCapitalize={"sentences"}
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
          />
          <Spacer value={H("2%")} axis="vertical" />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Message
          </SmallText>
          <Spacer value={H("1%")} axis="vertical" />
          <InputField
            onTextChange={(value) => setMessage(value)}
            defaultValue={message}
            placeholder="Enter your message here"
            containerStyle={{
              width: "100%",
              backgroundColor: darkMode ? "#0F0F0F" : "transparent",
            }}
            multiline
            type={"default"}
            style={{
              backgroundColor: darkMode ? "transparent" : "white",
              height: 150,
            }}
            autoCapitalize={"sentences"}
            className="border-[#626262] focus:border-primary border rounded-lg  px-3"
          />
          <Spacer axis="vertical" value={H(3)} />
          <View className="w-full">
            <Button
              text={"Send Message"}
              buttonStyle={{ width: "100%" }}
              buttonStyleClassName="rounded-lg"
              onPress={validate}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Contact;
