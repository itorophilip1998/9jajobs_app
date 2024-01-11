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
import { useSelector } from "react-redux";
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

const Contact = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [message, setMessage] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");

  const { darkMode, lat, lng } = useSelector((state: RootState) => state.auth);
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
                data: { name: "9JAJOB.COM INT’L", lng: 0, lat: 0 },
              });
            }}
            className="flex-1 w-full h-[200px]"
            style={[shadowBoxDark]}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lng,
              }}
              title={"My Location"}
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
            <SmallText
              style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
              className="font-RedHatDisplayRegular text-[18px] text-left p-0"
            >
              Ikeja, Lagos Nigeria
            </SmallText>
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
            <SmallText
              onPress={() => Linking.openURL("mailto:info@9jajob.com")}
              style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
              className="font-RedHatDisplayRegular text-[18px] text-left p-0"
            >
              info@9jajob.com
            </SmallText>
            <SmallText
              onPress={() => Linking.openURL("mailto:9jajobconnect@gmail.com")}
              style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
              className="font-RedHatDisplayRegular text-[18px] text-left p-0"
            >
              9jajobconnect@gmail.com
            </SmallText>
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
            <SmallText
              onPress={() => Linking.openURL("tel:+2349151987637")}
              style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
              className="font-RedHatDisplayRegular text-[18px] text-left p-0"
            >
              +234 915 198 7637
            </SmallText>
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
            onTextChange={(value) => setMessage(value.trim())}
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
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Contact;
