import {
  View,
  Text,
  KeyboardAvoidingView,
  Switch,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { BottomSheet, Button, InputField, SmallText } from "../../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { SET_DARK_MODE } from "../../store/authSlice";
import { COLORS } from "../../utility/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { FONTS } from "../../utility/fonts";
import { GooglePlacesAutocomplete,  } from "react-native-google-places-autocomplete";

const EditProfile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const locationRef = React.useRef<RBSheet | null>(null);

  const [name, setName] = React.useState<string>("John Doe");
  const [email, setEmail] = React.useState<string>("user@gmail.com");
  const [phone, setPhone] = React.useState<string>("07041528380");
  const [location, setLocation] = React.useState<string>("Abuja, Nigeria");
  const [password, setPassword] = React.useState<string>("12345678");
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black pb-4">
        <ScrollView className="flex-1">
          <View className="w-full h-[170px] items-center mb-[40px]">
            <Image
              source={{
                uri:
                  selectedImage ||
                  "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
              alt=""
              className=" w-[100%] mx-auto h-[180px] rounded-b-3xl"
            />
            <Button
              icon={<Feather name="camera" size={24} color="#fff" />}
              text=""
              buttonStyle={{ width: W(15) }}
              onPress={pickImage}
              buttonStyleClassName="rounded-lg absolute bottom-[-15px] bg-transparent"
            />
          </View>
          <View className="w-full flex-row justify-between items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]">
            <SmallText className="text-left p-0 text-[#D4E1D2] text-[18px] pb-2">
              Dark mode
            </SmallText>
            <Switch
              trackColor={{ false: "#696969", true: "#696969" }}
              thumbColor={COLORS.primary}
              ios_backgroundColor="#696969"
              onValueChange={(e) => {
                dispatch(SET_DARK_MODE(e));
              }}
              value={darkMode}
            />
          </View>
          <View className="w-full flex-row justify-between items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]">
            <SmallText className="text-left p-0 text-[#D4E1D2] text-[18px] pb-2">
              Notification
            </SmallText>
            <Switch
              trackColor={{ false: "#696969", true: "#696969" }}
              thumbColor={COLORS.primary}
              ios_backgroundColor="#696969"
              onValueChange={(e) => {
                dispatch(SET_DARK_MODE(e));
              }}
              value={darkMode}
            />
          </View>
          <View className="w-full flex-row justify-between items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]">
            <SmallText className="text-left p-0 text-[#D4E1D2] text-[18px] pb-2">
              Language
            </SmallText>
            <SmallText className="text-right p-0 text-[#696969] text-[18px] pb-2">
              English
            </SmallText>
          </View>
          <View className="w-full flex-row justify-end items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]">
            <Button
              text="Logout"
              buttonStyle={{ width: W(23), height: H(5) }}
              textStyleClassName="text-[14px]"
            />
          </View>
          <SmallText className="text-left p-0 text-[#D4E1D2] text-[20px] py-3 px-3">
            Edit Profile
          </SmallText>
          <View className="w-full px-3">
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Name
            </SmallText>
            <InputField
              onTextChange={(value) => setName(value)}
              defaultValue={name}
              placeholder="John Doe"
              type={"default"}
              autoCapitalize={"words"}
              className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Email Address
            </SmallText>
            <InputField
              onTextChange={(value) => setEmail(value)}
              defaultValue={email}
              placeholder="abc@gmail.com"
              type={"email-address"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Phone Number
            </SmallText>
            <InputField
              onTextChange={(value) => setPhone(value)}
              defaultValue={phone}
              placeholder="Enter phone number"
              type={"numeric"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Location
            </SmallText>
            <InputField
              onTextChange={(value) => setLocation(value)}
              defaultValue={location}
              placeholder="Select your business location"
              type={"default"}
              containerStyle={{ width: "100%" }}
              autoCapitalize={"none"}
              className="focus:border-primary border-[#626262] border-b rounded-none p-0 mb-3"
              editable={false}
              suffixIcon={
                <Feather name="chevron-down" size={24} color="#626262" />
              }
              onSuffixTap={() => locationRef.current?.open()}
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Reset Password
            </SmallText>
            <InputField
              onTextChange={(value) => setPassword(value)}
              defaultValue={password}
              placeholder="Enter your password"
              type={"default"}
              secure
              autoCapitalize={"none"}
              className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3"
            />
            <Button text="Save Changes" />
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* POPUP FOR GOOGLE PLACES LOCATION FOR LOCATION */}
      <BottomSheet ref={locationRef} duration={0}>
        <View className="flex-1 bg-[#1b1b1b] py-3 px-3">
          <GooglePlacesAutocomplete
            placeholder="Search City"
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

export default EditProfile;
