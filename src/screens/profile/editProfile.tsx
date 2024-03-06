import {
  View,
  Text,
  KeyboardAvoidingView,
  Switch,
  Image,
  ScrollView,
  Platform,
  Alert,
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
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  LOGIN,
  SET_DARK_MODE,
  SET_PROFILE,
  SET_TOKEN,
} from "../../store/authSlice";
import { COLORS } from "../../utility/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { FONTS } from "../../utility/fonts";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SET_LOADER } from "../../store/formDataSlice";
import { deleteAccount, logout } from "../../api/auth";
import Toast from "react-native-toast-message";
import userImg from "../../../assets/images/user.jpg";
import {
  DelayFor,
  VALIDATE_USER_DATA,
  validatePhone,
} from "../../utility/helpers";
import { editUser, getUser } from "../../api/user";
import { useIsFocused } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import ErrorVerifyModalContent from "../../components/errorVerifyModalContent";

const EditProfile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const locationRef = React.useRef<RBSheet | null>(null);
  console.log(profile);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirm_password, setConfirmPassword] = React.useState<string>("");
  const [selectedImage, setSelectedImage] = React.useState<string>("");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [visible1, setVisible1] = React.useState<boolean>(false);

  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const freeSpace = await FileSystem.getFreeDiskStorageAsync();
      if (freeSpace < 100) {
        Toast.show({
          type: "error",
          text1: "Please free up space to 100mb",
        });
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        dispatch(SET_LOADER(true));
        editUser(
          {
            photo: {
              name:
                result.assets[0].fileName ||
                "photo." +
                  result.assets[0].uri?.split(".").pop()?.toLowerCase(),
              uri: result.assets[0].uri,
              type:
                "image/" +
                result.assets[0].uri?.split(".").pop()?.toLowerCase(),
            },
          },
          (response) => {
            getUser(
              (response1) => {
                Toast.show({
                  type: "success",
                  text1: response?.message,
                });
                dispatch(SET_LOADER(false));
                dispatch(SET_PROFILE(response1));
                setSelectedImage(result.assets[0].uri);
              },
              (error) => {
                Toast.show({
                  type: "error",
                  text1: error,
                });
                dispatch(SET_LOADER(false));
              }
            );
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
    } else {
      Alert.alert(
        "Error",
        "This application does not have access. Please enable it from your settings.",
        [{ text: "Ok" }]
      );
    }
  };

  React.useEffect(() => {
    setName(profile?.name || "");
    setEmail(profile?.email || "");
    setPhone(profile?.phone || "");
    setLocation(profile?.address || "");
    setCity(profile?.city || "");
    setState(profile?.state || "");
    setCountry(profile?.country || "");
    setSelectedImage(profile?.photo);
  }, [profile]);

  const validateProfile = () => {
    VALIDATE_USER_DATA({ name, phone }, (e) => {
      if (location === "" || country === "" || state === "" || city === "") {
        Toast.show({
          type: "error",
          text1: "Please select a location.",
        });
        return;
      }
      if (!validatePhone(phone)) {
        Toast.show({
          type: "error",
          text1: "Phone number must be up to 11 characters.",
        });
        return;
      }

      dispatch(SET_LOADER(true));
      editUser(
        {
          name,
          phone,
          address: location,
          city,
          country,
          state,
        },
        (response) => {
          getUser(
            (response1) => {
              Toast.show({
                type: "success",
                text1: response?.message,
              });
              dispatch(SET_LOADER(false));
              dispatch(SET_PROFILE(response1));
            },
            (error) => {
              Toast.show({
                type: "error",
                text1: error,
              });
              dispatch(SET_LOADER(false));
            }
          );
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
          dispatch(SET_LOADER(false));
        }
      );
    });
  };

  const validatePassword = () => {
    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Password must not be less than 8 characters.",
      });
    } else if (password !== confirm_password) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
      });
    } else {
      dispatch(SET_LOADER(true));
      editUser(
        {
          name: name === "" ? profile?.name : name,
          password: password,
          re_password: confirm_password,
        },
        (response) => {
          getUser(
            (response1) => {
              Toast.show({
                type: "success",
                text1: response?.message,
              });
              dispatch(SET_LOADER(false));
              dispatch(SET_PROFILE(response1));
            },
            (error) => {
              Toast.show({
                type: "error",
                text1: error,
              });
              dispatch(SET_LOADER(false));
            }
          );
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

  const deleteUser = () => {
    dispatch(SET_LOADER(true));
    deleteAccount(
      { user_id: profile?.id, status: "inactive" },
      (response) => {
        dispatch(LOGIN(false));
        dispatch(SET_TOKEN(null));
        dispatch(SET_LOADER(false));
        navigation.navigate("HomeStack");
      },
      (error) => {
        dispatch(SET_LOADER(false));
        Toast.show({
          type: "error",
          text1: error,
        });
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
      <SafeAreaView className="flex-1 w-full pb-4">
        <ScrollView className="flex-1">
          <View className="w-full h-[170px] items-center mb-[40px]">
            <Image
              source={
                selectedImage
                  ? {
                      uri: selectedImage,
                    }
                  : userImg
              }
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
          <View
            style={{ borderBottomColor: darkMode ? "#0F0F0F" : "#CCC5D5" }}
            className="w-full flex-row justify-between items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-left p-0 text-[#D4E1D2] text-[18px] pb-2"
            >
              Dark mode
            </SmallText>
            <Switch
              trackColor={{ false: "#c6c6c6", true: "#696969" }}
              thumbColor={COLORS.primary}
              ios_backgroundColor={darkMode ? "#696969" : "#c6c6c6"}
              onValueChange={(e) => {
                dispatch(SET_DARK_MODE(e));
              }}
              value={darkMode}
            />
          </View>
          {/* <View
            style={{ borderBottomColor: darkMode ? "#0F0F0F" : "#CCC5D5" }}
            className="w-full flex-row justify-between items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-left p-0 text-[#D4E1D2] text-[18px] pb-2"
            >
              Notification
            </SmallText>
            <Switch
              trackColor={{ false: "#c6c6c6", true: "#696969" }}
              thumbColor={COLORS.primary}
              ios_backgroundColor={darkMode ? "#696969" : "#c6c6c6"}
              onValueChange={(e) => {
                dispatch(SET_DARK_MODE(e));
              }}
              value={darkMode}
            />
          </View> */}
          {/* <View
            style={{ borderBottomColor: darkMode ? "#0F0F0F" : "#CCC5D5" }}
            className="w-full flex-row justify-between items-center px-3 py-2 border-b-2 border-b-[#0F0F0F]"
          >
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-left p-0 text-[#D4E1D2] text-[18px] pb-2"
            >
              Language
            </SmallText>
            <SmallText className="text-right p-0 text-[#696969] text-[18px] pb-2">
              English
            </SmallText>
          </View> */}
          <View
            style={{ borderBottomColor: darkMode ? "#0F0F0F" : "#CCC5D5" }}
            className="w-full flex-row justify-between items-center px-3 py-4 pb-5 border-b-2 border-b-[#0F0F0F]"
          >
            <Button
              text="Delete"
              buttonStyle={{ width: W(23), height: H(5) }}
              textStyleClassName="text-[14px]"
              onPress={() => setDeleteModal(true)}
            />
            <Button
              text="Logout"
              buttonStyle={{ width: W(23), height: H(5) }}
              textStyleClassName="text-[14px]"
              onPress={() => {
                dispatch(SET_LOADER(true));
                logout(
                  (response) => {
                    Toast.show({
                      type: "success",
                      text1: response.message,
                    });
                    dispatch(LOGIN(false));
                    dispatch(SET_TOKEN(null));
                    dispatch(SET_LOADER(false));
                    navigation.navigate("HomeStack");
                  },
                  (error) => {
                    dispatch(SET_LOADER(false));
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                  }
                );
              }}
            />
          </View>
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-left p-0 text-[#D4E1D2] text-[20px] py-3 px-3"
          >
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
              containerStyle={{ width: "100%" }}
              autoCapitalize={"words"}
              className="border-[#626262] border-b rounded-none p-0 mb-3"
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Email Address
            </SmallText>
            <InputField
              onTextChange={(value) => setEmail(value)}
              defaultValue={email}
              containerStyle={{ width: "100%" }}
              placeholder="abc@gmail.com"
              editable={false}
              type={"email-address"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0 mb-3"
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Phone Number
            </SmallText>
            <InputField
              onTextChange={(value) => setPhone(value)}
              defaultValue={phone}
              containerStyle={{ width: "100%" }}
              placeholder="Enter phone number"
              type={"numeric"}
              autoCapitalize={"none"}
              className="border-[#626262] border-b rounded-none p-0 mb-3"
            />
            <SmallText className="text-left p-0 text-[#696969] text-[15px]">
              Location
            </SmallText>
            <InputField
              onTextChange={(value) => setLocation(value)}
              defaultValue={location}
              placeholder="Enter your location"
              type={"default"}
              containerStyle={{ width: "100%" }}
              autoCapitalize={"none"}
              className="rounded-none p-0"
              containerClassName="border-[#626262] border-b rounded-none p-0 mb-3"
              editable={false}
              dropdown
              suffixIcon={
                <Feather name="chevron-down" size={24} color="#626262" />
              }
              onSuffixTap={() => locationRef.current?.open()}
            />
            <Button
              text="Save Changes"
              buttonStyle={{ width: "100%" }}
              buttonStyleClassName="mb-5 mt-3"
              onPress={validateProfile}
            />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-left p-0 text-[#D4E1D2] text-[20px] py-3"
            >
              Reset Password
            </SmallText>
            <InputField
              onTextChange={(value) => setPassword(value)}
              defaultValue={password}
              placeholder="Enter your password"
              type={"default"}
              containerStyle={{ width: "100%" }}
              autoCapitalize={"none"}
              className="rounded-none p-0"
              containerClassName="border-[#626262] border-b rounded-none p-0 mb-3"
              secure={!visible}
              suffixIcon={
                <Feather
                  name={visible ? "eye-off" : "eye"}
                  size={20}
                  color="#626262"
                />
              }
              onSuffixTap={() => setVisible(!visible)}
            />
            <InputField
              onTextChange={(value) => setConfirmPassword(value)}
              defaultValue={confirm_password}
              placeholder="Re-Type password"
              type={"default"}
              containerStyle={{ width: "100%" }}
              autoCapitalize={"none"}
              className="rounded-none p-0"
              containerClassName="focus:border-primary border-[#626262] border-b rounded-none p-0 mb-3"
              secure={!visible1}
              suffixIcon={
                <Feather
                  name={visible1 ? "eye-off" : "eye"}
                  size={20}
                  color="#626262"
                />
              }
              onSuffixTap={() => setVisible1(!visible1)}
            />
            <Button
              text="Save Changes"
              buttonStyle={{ width: "100%" }}
              onPress={validatePassword}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* POPUP FOR GOOGLE PLACES LOCATION FOR LOCATION */}
      <BottomSheet ref={locationRef} duration={0}>
        <View
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
          className="flex-1 bg-[#1b1b1b] py-3 px-3"
        >
          <GooglePlacesAutocomplete
            placeholder="Search Location"
            enableHighAccuracyLocation
            debounce={400}
            textInputProps={{
              placeholderTextColor: darkMode ? "#c6c6c6" : "#000",
            }}
            onPress={(data, details = null) => {
              const city = details?.address_components.find(
                (item) => item.types[0] === "locality"
              );
              const country_state = details?.address_components.find(
                (item) => item.types[0] === "administrative_area_level_1"
              );
              const country = details?.address_components.find(
                (item) => item.types[0] === "country"
              );
              setLocation(details?.formatted_address || "");
              setCity(city?.long_name || "");
              setState(country_state?.long_name || "");
              setCountry(country?.long_name || "");
              locationRef.current?.close();
            }}
            query={{
              key: "AIzaSyC6yqP8_qWQsmhyqkSrAgTm7CUQ6yHwzRY",
              language: "en",
              components: "country:NG",
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
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
                backgroundColor: "transparent",
                color: darkMode ? "#c6c6c6" : "#0f0f0f",
                fontSize: 15,
                borderWidth: 1,
                borderColor: COLORS.primary,
                height: 50,
              },
            }}
          />
        </View>
      </BottomSheet>
      <ErrorVerifyModalContent
        message={{
          title: "Warning",
          message: `You are about to delete your account. This action is irreversable. Do you wish to proceed?`,
        }}
        color={COLORS.danger}
        visible={deleteModal}
        icon={<AntDesign name="warning" size={24} color={COLORS.danger} />}
      >
        <View className="flex-row justify-between items-center">
          <Button
            text="Yes"
            buttonStyle={{ width: W("36%"), marginRight: W("3%") }}
            // buttonStyleClassName="bg-[#C93636]"
            onPress={() => {
              setDeleteModal(false);
              DelayFor(500, deleteUser);
            }}
          />
          <Button
            text="No"
            buttonStyle={{ width: W("36%") }}
            // buttonStyleClassName="bg-transparent border border-[#C3B9B9]"
            // textStyleClassName="text-[#212121]"
            onPress={() => setDeleteModal(false)}
          />
        </View>
      </ErrorVerifyModalContent>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
