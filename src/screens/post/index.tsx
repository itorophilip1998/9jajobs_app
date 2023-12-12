import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
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
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { CATEGORIES } from "../../data/category";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { COLORS } from "../../utility/colors";
import { FONTS } from "../../utility/fonts";
import { ResizeMode, Video } from "expo-av";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { shadowBoxDark } from "../../style/Typography";
import { useAuthorize } from "../../hooks/useAuthorized";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import {
  getAmenities,
  getCategoryListing,
  getUserListing,
} from "../../api/category";
import { SET_LOADER } from "../../store/formDataSlice";

const Post = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const { loggedIn, access_token, darkMode, profile } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (focused) {
      if (!Boolean(loggedIn && access_token)) {
        navigation.navigate("Signin", { two_step: true });
      } else {
        if (profile?.package) {
          dispatch(SET_LOADER(true));
          getUserListing(
            null,
            (response) => {
              dispatch(SET_LOADER(false));
              if (
                response?.length >=
                profile?.package?.purchase_details?.total_listings
              ) {
                navigation.navigate("Packages");
                Toast.show({
                  type: "error",
                  text1: "Maximum limit reached for package. Upgrade Package.",
                });
              }
            },
            (error) => {
              dispatch(SET_LOADER(false));
              Toast.show({
                type: "error",
                text1: error,
              });
            }
          );
        } else {
          navigation.navigate("Packages");
          Toast.show({
            type: "error",
            text1: "Purchase a package to create listing",
          });
        }
      }
    }
  }, [focused, loggedIn, access_token]);

  const [business, setBusiness] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<any>(null);
  const [location, setLocation] = React.useState<string>("");
  const [monday, setMonday] = React.useState<string>("");
  const [tuesday, setTuesday] = React.useState<string>("");
  const [wednesday, setWednesday] = React.useState<string>("");
  const [thursday, setThursday] = React.useState<string>("");
  const [friday, setFriday] = React.useState<string>("");
  const [saturday, setSaturday] = React.useState<string>("");
  const [sunday, setSunday] = React.useState<string>("");
  const [longitude, setLongitude] = React.useState<string | null>(null);
  const [latitude, setLatitude] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [website, setWebsite] = React.useState<string>("");
  const [whatsapp, setWhatsapp] = React.useState<string>("");
  const [facebook, setFacebook] = React.useState<string>("");
  const [instagram, setInstagram] = React.useState<string>("");
  const [twitter, setTwitter] = React.useState<string>("");
  const [linkedIn, setLinkedIn] = React.useState<string>("");
  const [amenities, setAmenities] = React.useState<any[]>([]);
  const [selectedVideos, setSelectedVideos] = React.useState<any[]>([]);
  const [selectedImages, setSelectedImages] = React.useState<any[]>([]);
  const [logo, setLogo] = React.useState<any>(null);

  const [allCategory, setAllCategory] = React.useState<any[]>([]);
  const [allAmenities, setAllAmenities] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (focused) {
      dispatch(SET_LOADER(true));
      getCategoryListing(
        (response) => {
          setAllCategory(response);
          dispatch(SET_LOADER(false));
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
  }, [focused]);

  React.useEffect(() => {
    if (focused) {
      dispatch(SET_LOADER(true));
      getAmenities(
        (response) => {
          dispatch(SET_LOADER(false));
          setAllAmenities(response);
          console.log(response);
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
  }, [focused]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Enable multiple selection
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        setSelectedImages((prev) => [...prev, result.assets[i]]);
      }
    }
  };

  const pickOneImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setLogo(result.assets[0]);
    }
  };

  const pickVideos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true, // Enable multiple selection
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        setSelectedVideos((prev) => [...prev, result.assets[i]]);
      }
    }
  };

  const categoryRef = React.useRef<RBSheet | null>(null);
  const locationRef = React.useRef<RBSheet | null>(null);
  const amenitiesRef = React.useRef<RBSheet | null>(null);
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 items-center bg-[#0f0f0f]"
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
            <TitleWithButton
              title="Post New Ad"
              fire={() => navigation.goBack()}
              //   right
              //   rightFire={() => {}}
            />
          </View>
          <ScrollView
            style={{ backgroundColor: darkMode ? "#0f0f0f" : "transparent" }}
            className="flex-1 px-3 bg-black rounded-t-xl py-3"
          >
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Category
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => {}}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              defaultValue={category?.listing_category_name || ""}
              placeholder="Select your business category"
              type={"default"}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
              editable={false}
              suffixIcon={
                <Feather name="chevron-down" size={24} color="#626262" />
              }
              onSuffixTap={() => categoryRef.current?.open()}
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Business Name
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setBusiness(value)}
              defaultValue={business}
              placeholder="Enter your business name here"
              containerStyle={{ width: "100%" }}
              type={"default"}
              autoCapitalize={"none"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Description
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setDescription(value)}
              defaultValue={description}
              placeholder="Describe your business here"
              containerStyle={{ width: "100%" }}
              multiline
              type={"default"}
              style={{
                backgroundColor: darkMode ? "transparent" : "white",
                height: 150,
              }}
              autoCapitalize={"none"}
              className="border-[#626262] focus:border-primary border rounded-lg  px-3"
            />
            <Spacer axis="vertical" value={H(2)} />

            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Location
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setLocation(value)}
              defaultValue={location}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              placeholder="Select your business location"
              type={"default"}
              containerStyle={{ width: "100%" }}
              autoCapitalize={"none"}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
              editable={false}
              suffixIcon={
                <Feather name="chevron-down" size={24} color="#626262" />
              }
              onSuffixTap={() => locationRef.current?.open()}
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Email
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setEmail(value)}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              defaultValue={email}
              placeholder="Enter your business email address"
              type={"default"}
              containerStyle={{ width: "100%" }}
              autoCapitalize={"none"}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
            />
            <Spacer axis="vertical" value={H(2)} />
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
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              placeholder="Enter your business phone number"
              containerStyle={{ width: "100%" }}
              type={"default"}
              autoCapitalize={"none"}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Website
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setWebsite(value)}
              defaultValue={website}
              placeholder="Enter your business website link"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Amenities
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => {}}
              defaultValue={amenities
                .map((item) => item.amenity_name)
                .join(", ")}
              placeholder="Select amenities for your business"
              type={"default"}
              containerStyle={{ width: "100%" }}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
              editable={false}
              suffixIcon={
                <Feather name="chevron-down" size={24} color="#626262" />
              }
              onSuffixTap={() => amenitiesRef.current?.open()}
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Monday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setMonday(value)}
              defaultValue={monday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Tuesday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setTuesday(value)}
              defaultValue={tuesday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Wednesday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setWednesday(value)}
              defaultValue={wednesday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Thursday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setThursday(value)}
              defaultValue={thursday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Friday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setFriday(value)}
              defaultValue={friday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Saturday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setSaturday(value)}
              defaultValue={saturday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Sunday
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setSunday(value)}
              defaultValue={sunday}
              placeholder="6AM - 8PM"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Social Media
            </SmallText>
            <Spacer axis="vertical" value={H(1)} />
            <InputField
              onTextChange={(value) => setWhatsapp(value)}
              defaultValue={whatsapp}
              placeholder="Whatsapp Number"
              type={"numeric"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setFacebook(value)}
              defaultValue={facebook}
              placeholder="Facebook Link"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setInstagram(value)}
              defaultValue={instagram}
              placeholder="Instagram Link"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setTwitter(value)}
              defaultValue={twitter}
              placeholder="Twitter Link"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setLinkedIn(value)}
              defaultValue={linkedIn}
              placeholder="LinkedIn Link"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{ width: "100%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Spacer axis="vertical" value={H(2)} />
            <View className="flex-row w-full justify-between items-start">
              <View className="w-[33%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Add Company Logo
                </SmallText>
                {logo ? (
                  <View className="w-[45%] h-[60px] mb-3 relative">
                    <Image
                      source={{ uri: logo.uri }}
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
                      onPress={() => setLogo(null)}
                    />
                  </View>
                ) : (
                  <Pressable
                    onPress={pickOneImage}
                    style={[
                      !darkMode && shadowBoxDark,
                      {
                        backgroundColor: darkMode ? "#0F0F0F" : "#FFFFFF",
                      },
                    ]}
                    className="w-[45%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                  >
                    <Entypo
                      name="plus"
                      size={27}
                      color={darkMode ? "#D4E1D2" : COLORS.primary}
                    />
                  </Pressable>
                )}
              </View>
              <View className="w-[33%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Add at least 2 images
                </SmallText>
                {selectedImages.map((item, idx) => (
                  <View
                    key={idx.toString()}
                    className="w-[45%] h-[60px] mb-3 relative"
                  >
                    <Image
                      source={{ uri: item.uri }}
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
                      onPress={() =>
                        setSelectedImages(
                          selectedImages.filter((item, index) => idx !== index)
                        )
                      }
                    />
                  </View>
                ))}
                <Pressable
                  onPress={pickImages}
                  style={[
                    !darkMode && shadowBoxDark,
                    {
                      backgroundColor: darkMode ? "#0F0F0F" : "#FFFFFF",
                    },
                  ]}
                  className="w-[45%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo
                    name="plus"
                    size={27}
                    color={darkMode ? "#D4E1D2" : COLORS.primary}
                  />
                </Pressable>
              </View>
              <View className="w-[33%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Add Video (Optional)
                </SmallText>
                {selectedVideos.map((item, idx) => (
                  <View
                    key={idx.toString()}
                    className="w-[45%] h-[60px] mb-3 relative"
                  >
                    <Video
                      source={{ uri: item.uri }}
                      isMuted={true}
                      resizeMode={ResizeMode.COVER}
                      shouldPlay={true}
                      isLooping
                      style={{ width: "100%", height: "100%" }}
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
                      onPress={() =>
                        setSelectedVideos(
                          selectedVideos.filter((item, index) => idx !== index)
                        )
                      }
                    />
                  </View>
                ))}
                <Pressable
                  onPress={pickVideos}
                  style={[
                    !darkMode && shadowBoxDark,
                    {
                      backgroundColor: darkMode ? "#0F0F0F" : "#FFFFFF",
                    },
                  ]}
                  className="w-[45%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo
                    name="plus"
                    size={27}
                    color={darkMode ? "#D4E1D2" : COLORS.primary}
                  />
                </Pressable>
              </View>
            </View>
            <Spacer axis="vertical" value={H(3)} />
            <Button text="Post Ad" buttonStyle={{ width: "100%" }} />
            <Spacer axis="vertical" value={H(5)} />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* CATEGORY BOTTOM SHEET POPUP */}
      <BottomSheet ref={categoryRef} duration={0}>
        <View
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
          className="w-full flex-1 px-5 bg-[#0f0f0f]"
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Spacer value={H("3%")} axis="vertical" />}
            data={allCategory}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[100%] h-auto flex-row items-center"
                onPress={() => {
                  setCategory(item);
                  categoryRef.current?.close();
                }}
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-left text-[#D4E1D2] p-0 font-ManropeSemiBold text-[15px]"
                >
                  {item.listing_category_name}
                </SmallText>
              </Pressable>
            )}
            ListFooterComponent={<Spacer value={H("3%")} axis="vertical" />}
          />
        </View>
      </BottomSheet>

      {/* AMENITIES BOTTOM SHEET POPUP */}
      <BottomSheet ref={amenitiesRef} duration={0}>
        <View
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
          className="w-full flex-1 px-5 bg-[#0f0f0f]"
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Spacer value={H("3%")} axis="vertical" />}
            data={allAmenities}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[100%] h-auto flex-row items-center"
                onPress={() => {
                  const isItemInArray = amenities.some(
                    (obj) => obj.id === item.id
                  );

                  if (isItemInArray) {
                    setAmenities((prev: any) =>
                      prev.filter((obj: any) => item.id !== obj.id)
                    );
                  } else {
                    setAmenities((prev: any) => [...prev, item]);
                  }
                }}
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-left text-[#D4E1D2] p-0 font-ManropeSemiBold text-[15px]"
                >
                  {item?.amenity_name}
                </SmallText>
              </Pressable>
            )}
            ListFooterComponent={<Spacer value={H("3%")} axis="vertical" />}
          />
        </View>
      </BottomSheet>

      {/* POPUP FOR GOOGLE PLACES LOCATION FOR LOCATION */}
      <BottomSheet ref={locationRef} duration={0}>
        <View
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
          className="flex-1 bg-[#1b1b1b] py-3 px-3"
        >
          <GooglePlacesAutocomplete
            placeholder="Search location"
            enableHighAccuracyLocation
            debounce={400}
            onPress={(data, details = null) => {
              setLocation(details?.formatted_address || "");
              setLatitude(
                details ? details.geometry.location.lat.toString() : null
              );
              setLongitude(
                details ? details.geometry.location.lng.toString() : null
              );
              locationRef.current?.close();
            }}
            query={{
              key: "AIzaSyC6yqP8_qWQsmhyqkSrAgTm7CUQ6yHwzRY",
              language: "en",
            }}
            fetchDetails={true}
            enablePoweredByContainer={true}
            minLength={2}
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
                    color: "#c6c6c6",
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
    </>
  );
};

export default Post;
