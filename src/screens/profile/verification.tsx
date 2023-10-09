import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  BottomSheet,
  Button,
  InputField,
  SmallText,
  Spacer,
} from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../utility/colors";
import Checkbox from "expo-checkbox";
import { toggleStringInArray } from "../../utility/helpers";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FONTS } from "../../utility/fonts";

const Verification = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [regNo, setRegNo] = React.useState<string>("");
  const [idFront, setIdFront] = React.useState<string | null>(null);
  const [idBack, setIdBack] = React.useState<string | null>(null);
  const [cac, setCac] = React.useState<string | null>(null);
  const [services, setServices] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<string>("");
  const [homeAddress, setHomeAddress] = React.useState<string>("");
  const [isChecked, setChecked] = React.useState<boolean>(false);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept any file type
        copyToCacheDirectory: true, // Copy the file to a temporary location
      });

      if (!result.canceled) {
        setCac(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const pickImages = async (type: "idFront" | "idBack") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "idFront") {
        setIdFront(result.assets[0].uri);
      } else if (type === "idBack") {
        setIdBack(result.assets[0].uri);
      }
    }
  };

  const locationRef = React.useRef<RBSheet | null>(null);
  const homeAddressRef = React.useRef<RBSheet | null>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black pb-4">
        <View className="relative flex flex-row items-center w-full justify-between px-3 py-2 bg-[#0f0f0f]">
          <TitleWithButton
            title="Verification"
            fire={() => navigation.goBack()}
          />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <ScrollView className="px-3 flex-1">
          <InputField
            onTextChange={(value) => setName(value)}
            defaultValue={name}
            placeholder="Company/Business Name"
            type={"default"}
            autoCapitalize={"words"}
            className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
          />
          <InputField
            onTextChange={(value) => setEmail(value)}
            defaultValue={email}
            placeholder="Email Address"
            type={"email-address"}
            autoCapitalize={"words"}
            className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
          />
          <InputField
            onTextChange={(value) => setRegNo(value)}
            defaultValue={regNo}
            placeholder="Registration Number"
            type={"default"}
            autoCapitalize={"words"}
            className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
          />
          <Spacer value={H("2%")} axis="vertical" />
          <View className="flex-row w-full justify-between items-start">
            <View className="w-[30%] flex-row flex-wrap justify-between items-center">
              <SmallText className="w-full text-[#D4E1D2] text-left p-0 pb-3">
                Upload ID card front
              </SmallText>
              {idFront ? (
                <View className="w-[100%] h-[60px] mb-3 relative">
                  <Image
                    source={{ uri: idFront }}
                    className="w-full h-full object-cover"
                  />
                  <Ionicons
                    name="ios-close-circle"
                    size={24}
                    color="black"
                    style={{
                      position: "absolute",
                      top: -17,
                      right: -17,
                      color: "red",
                    }}
                    onPress={() => setIdFront(null)}
                  />
                </View>
              ) : (
                <Pressable
                  onPress={() => pickImages("idFront")}
                  className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo name="plus" size={27} color="#D4E1D2" />
                </Pressable>
              )}
            </View>
            <View className="w-[30%] flex-row flex-wrap justify-between items-center">
              <SmallText className="w-full text-[#D4E1D2] text-left p-0 pb-3">
                Upload ID card back
              </SmallText>
              {idBack ? (
                <View className="w-[100%] h-[60px] mb-3 relative">
                  <Image
                    source={{ uri: idBack }}
                    className="w-full h-full object-cover"
                  />
                  <Ionicons
                    name="ios-close-circle"
                    size={24}
                    color="black"
                    style={{
                      position: "absolute",
                      top: -17,
                      right: -17,
                      color: "red",
                    }}
                    onPress={() => setIdBack(null)}
                  />
                </View>
              ) : (
                <Pressable
                  onPress={() => pickImages("idBack")}
                  className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo name="plus" size={27} color="#D4E1D2" />
                </Pressable>
              )}
            </View>
            <View className="w-[30%] flex-row flex-wrap justify-between items-center">
              <SmallText className="w-full text-[#D4E1D2] text-left p-0 pb-3">
                Upload CAC Certificate
              </SmallText>

              <Pressable
                onPress={pickFile}
                className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
              >
                <Entypo
                  name={cac ? "check" : "plus"}
                  size={27}
                  color={cac ? COLORS.primary : "#D4E1D2"}
                />
              </Pressable>
            </View>
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <View className="flex-row items-center flex-wrap">
            <View className="flex-row items-center mb-3 mr-3">
              <Checkbox
                color={COLORS.primary}
                value={services.includes("Sole")}
                onValueChange={(e) =>
                  setServices((prevState) =>
                    toggleStringInArray(prevState, "Sole")
                  )
                }
              />
              <SmallText className="text-[#696969] text-left p-0 ml-2">
                Sole
              </SmallText>
            </View>
            <View className="flex-row items-center mb-3 mr-3">
              <Checkbox
                color={COLORS.primary}
                value={services.includes("Private")}
                onValueChange={(e) =>
                  setServices((prevState) =>
                    toggleStringInArray(prevState, "Private")
                  )
                }
              />
              <SmallText className="text-[#696969] text-left p-0 ml-2">
                Private
              </SmallText>
            </View>
            <View className="flex-row items-center mb-3 mr-3">
              <Checkbox
                color={COLORS.primary}
                value={services.includes("Public")}
                onValueChange={(e) =>
                  setServices((prevState) =>
                    toggleStringInArray(prevState, "Public")
                  )
                }
              />
              <SmallText className="text-[#696969] text-left p-0 ml-2">
                Public
              </SmallText>
            </View>
            <View className="flex-row items-center mb-3 mr-3">
              <Checkbox
                color={COLORS.primary}
                value={services.includes("Limited")}
                onValueChange={(e) =>
                  setServices((prevState) =>
                    toggleStringInArray(prevState, "Limited")
                  )
                }
              />
              <SmallText className="text-[#696969] text-left p-0 ml-2">
                Limited
              </SmallText>
            </View>
            <View className="flex-row items-center mb-3 mr-3">
              <Checkbox
                color={COLORS.primary}
                value={services.includes("Unlimited")}
                onValueChange={(e) =>
                  setServices((prevState) =>
                    toggleStringInArray(prevState, "Unlimited")
                  )
                }
              />
              <SmallText className="text-[#696969] text-left p-0 ml-2">
                Unlimited
              </SmallText>
            </View>
            <View className="flex-row items-center mb-3 mr-3">
              <Checkbox
                color={COLORS.primary}
                value={services.includes("Guaranteed")}
                onValueChange={(e) =>
                  setServices((prevState) =>
                    toggleStringInArray(prevState, "Guaranteed")
                  )
                }
              />
              <SmallText className="text-[#696969] text-left p-0 ml-2">
                Guaranteed
              </SmallText>
            </View>
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <InputField
            onTextChange={(value) => setLocation(value)}
            defaultValue={location}
            placeholder="Location"
            type={"default"}
            containerStyle={{ width: "100%" }}
            autoCapitalize={"none"}
            className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
            editable={false}
            suffixIcon={
              <Feather name="chevron-down" size={24} color="#626262" />
            }
            onSuffixTap={() => locationRef.current?.open()}
          />
          <InputField
            onTextChange={(value) => setHomeAddress(value)}
            defaultValue={homeAddress}
            placeholder="Home Address"
            type={"default"}
            containerStyle={{ width: "100%" }}
            autoCapitalize={"none"}
            className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
            editable={false}
            suffixIcon={
              <Feather name="chevron-down" size={24} color="#626262" />
            }
            onSuffixTap={() => homeAddressRef.current?.open()}
          />
          <Spacer value={H("2%")} axis="vertical" />
          <View className="px-3 flex-row items-center">
            <Checkbox
              color={COLORS.primary}
              value={isChecked}
              onValueChange={setChecked}
            />
            <SmallText className="text-[15px] !text-[#696969] text-left !pl-3">
              By applying, you agree to our add and apply Policy
            </SmallText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <Button text="Verify" buttonStyle={{ width: "100%" }} />
          <Spacer value={H("3%")} axis="vertical" />
        </ScrollView>
      </SafeAreaView>
      {/* POPUP FOR GOOGLE PLACES LOCATION FOR LOCATION */}
      <BottomSheet ref={locationRef} duration={0}>
        <View className="flex-1 bg-[#1b1b1b] py-3 px-3">
          <GooglePlacesAutocomplete
            placeholder="Enter your Business Location"
            enableHighAccuracyLocation
            debounce={400}
            onPress={(data, details = null) => {}}
            query={{
              key: "AIzaSyDrzxYICs65yHUDjc4mPMU7T_m_PqQzSLI",
              language: "en",
            }}
            fetchDetails={true}
            enablePoweredByContainer={true}
            minLength={2}
            renderRow={(rowData) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="ios-location-sharp"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontFamily: FONTS.RedHatDisplayRegular,
                    color: "#D4E1D2",
                  }}
                >
                  {rowData.description}
                </Text>
              </View>
            )}
            styles={{
              textInput: {
                fontFamily: FONTS.RedHatDisplayRegular,
                backgroundColor: "transparent",
                color: "#D4E1D2",
                fontSize: 15,
                borderWidth: 1,
                borderColor: COLORS.primary,
                height: "50px",
              },
            }}
          />
        </View>
      </BottomSheet>

      {/* POPUP FOR GOOGLE PLACES LOCATION FOR HOME ADDRESS */}
      <BottomSheet ref={homeAddressRef} duration={0}>
        <View className="flex-1 bg-[#1b1b1b] py-3 px-3">
          <GooglePlacesAutocomplete
            placeholder="Enter your Home Address"
            enableHighAccuracyLocation
            debounce={400}
            onPress={(data, details = null) => {}}
            query={{
              key: "AIzaSyDrzxYICs65yHUDjc4mPMU7T_m_PqQzSLI",
              language: "en",
            }}
            fetchDetails={true}
            enablePoweredByContainer={true}
            minLength={2}
            renderRow={(rowData) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="ios-location-sharp"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontFamily: FONTS.RedHatDisplayRegular,
                    color: "#D4E1D2",
                  }}
                >
                  {rowData.description}
                </Text>
              </View>
            )}
            styles={{
              textInput: {
                fontFamily: FONTS.RedHatDisplayRegular,
                backgroundColor: "transparent",
                color: "#D4E1D2",
                fontSize: 15,
                borderWidth: 1,
                borderColor: COLORS.primary,
                height: "50px",
              },
            }}
          />
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default Verification;
