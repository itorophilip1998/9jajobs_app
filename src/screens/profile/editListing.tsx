import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
  Image,
  Alert,
  TextInput,
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
import { RouteProp } from "@react-navigation/native";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { COLORS } from "../../utility/colors";
import { FONTS } from "../../utility/fonts";
import { ResizeMode, Video } from "expo-av";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { shadowBoxDark } from "../../style/Typography";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import {
  getAmenities,
  getCategoryListing,
} from "../../api/category";
import { SET_LOADER } from "../../store/formDataSlice";
import {
  isFacebookLink,
  isInstagramLink,
  isLinkedInLink,
  isTwitterLink,
  validateEmail,
  validatePhone,
  validateUrl,
} from "../../utility/helpers";
import { editListing } from "../../api/listings";
import { GradientText } from "../../components/gradientText";
import { getFreeDiskStorageAsync } from "expo-file-system";

const EditListing = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const { loggedIn, access_token, darkMode, profile } = useSelector(
    (state: RootState) => state.auth
  );

  const [categorySearch, setCategorySearch] = React.useState<string>("");
  const [amenitySearch, setAmenitySearch] = React.useState<string>("");
  const [business, setBusiness] = React.useState<string>(
    route.params?.data.listing_name || ""
  );
  const [description, setDescription] = React.useState<string>(
    route.params?.data.listing_description?.replaceAll(
      /<\/?[^>]+(>|$)/gi,
      ""
    ) || ""
  );
  const [category, setCategory] = React.useState<any>(
    route.params?.data?.r_listing_category || null
  );
  const [location, setLocation] = React.useState<string>(
    route.params?.data?.listing_address
  );
  const [monday, setMonday] = React.useState<string>(
    route.params?.data?.listing_oh_monday || ""
  );
  const [tuesday, setTuesday] = React.useState<string>(
    route.params?.data.listing_oh_tuesday || ""
  );
  const [wednesday, setWednesday] = React.useState<string>(
    route.params?.data?.listing_oh_wednesday || ""
  );
  const [thursday, setThursday] = React.useState<string>(
    route.params?.data.listing_oh_thursday || ""
  );
  const [friday, setFriday] = React.useState<string>(
    route.params?.data.listing_oh_friday || ""
  );
  const [saturday, setSaturday] = React.useState<string>(
    route.params?.data.listing_oh_saturday || ""
  );
  const [sunday, setSunday] = React.useState<string>(
    route.params?.data.listing_oh_sunday || ""
  );
  const [longitude, setLongitude] = React.useState<string | null>(
    route.params?.data?.address_latitude || null
  );
  const [latitude, setLatitude] = React.useState<string | null>(
    route.params?.data?.address_longitude || null
  );
  const [email, setEmail] = React.useState<string>(
    route.params?.data.listing_email || ""
  );
  const [phone, setPhone] = React.useState<string>(
    route.params?.data?.listing_phone?.charAt(0) === "0"
      ? route.params?.data?.listing_phone
      : "0" + route.params?.data?.listing_phone || ""
  );
  const [website, setWebsite] = React.useState<string>(
    route.params?.data?.listing_website || ""
  );
  const [whatsapp, setWhatsapp] = React.useState<string>(
    route.params?.data?.listing_social_item
      .find((item: any) => item?.social_icon?.toLowerCase() === "whatsapp")
      ?.social_url?.replace("https://wa.me/", "0") || ""
  );
  const [facebook, setFacebook] = React.useState<string>(
    route.params?.data?.listing_social_item.find(
      (item: any) => item?.social_icon?.toLowerCase() === "facebook"
    )?.social_url || ""
  );
  const [instagram, setInstagram] = React.useState<string>(
    route.params?.data?.listing_social_item.find(
      (item: any) => item?.social_icon?.toLowerCase() === "instagram"
    )?.social_url || ""
  );
  const [twitter, setTwitter] = React.useState<string>(
    route.params?.data?.listing_social_item.find(
      (item: any) => item?.social_icon?.toLowerCase() === "twitter"
    )?.social_url || ""
  );
  const [linkedIn, setLinkedIn] = React.useState<string>(
    route.params?.data?.listing_social_item.find(
      (item: any) => item?.social_icon?.toLowerCase() === "linkedin"
    )?.social_url || ""
  );
  const [amenities, setAmenities] = React.useState<any[]>(
    route.params?.data?.amenities || []
  );
  const [selectedVideos, setSelectedVideos] = React.useState<any[]>([]);
  const [selectedImages, setSelectedImages] = React.useState<any[]>([]);
  const [logo, setLogo] = React.useState<any>(null);

  // React.useEffect(() => {
  //   if (focused) {
  //     if (!Boolean(loggedIn && access_token)) {
  //       navigation.navigate("Signin", { two_step: true });
  //     } else {

  //     }
  //   }
  // }, [focused, loggedIn]);

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const freeSpace = await getFreeDiskStorageAsync();
      if (freeSpace < 100) {
        Toast.show({
          type: "error",
          text1: "Please free up space to 100mb",
        });
        return;
      }
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
    } else {
      Alert.alert(
        "Error",
        "This application does not have access. Please enable it from your settings.",
        [{ text: "Ok" }]
      );
    }
  };

  const pickOneImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const freeSpace = await getFreeDiskStorageAsync();
      if (freeSpace < 100) {
        Toast.show({
          type: "error",
          text1: "Please free up space to 100mb",
        });
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
        // allowsEditing: true,
      });

      if (!result.canceled) {
        setLogo(result.assets[0]);
      }
    } else {
      Alert.alert(
        "Error",
        "This application does not have access. Please enable it from your settings.",
        [{ text: "Ok" }]
      );
    }
  };

  const pickVideos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const freeSpace = await getFreeDiskStorageAsync();
      if (freeSpace < 100) {
        Toast.show({
          type: "error",
          text1: "Please free up space to 100mb",
        });
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: true, // Enable multiple selection
      });

      if (!result.canceled) {
        for (let i = 0; i < result.assets.length; i++) {
          setSelectedVideos((prev) => [...prev, result.assets[i]]);
        }
      }
    } else {
      Alert.alert(
        "Error",
        "This application does not have access. Please enable it from your settings.",
        [{ text: "Ok" }]
      );
    }
  };

  const categoryRef = React.useRef<RBSheet | null>(null);
  const locationRef = React.useRef<RBSheet | null>(null);
  const amenitiesRef = React.useRef<RBSheet | null>(null);

  React.useEffect(() => {
    if (profile) {
      setEmail(profile?.email || "");
      setPhone(profile?.phone || "");
      setWebsite(profile?.website || "");
    }
  }, [profile]);

  const validate = () => {
    if (!category) {
      Toast.show({
        type: "error",
        text1: "Select a Business Category.",
      });
    } else if (business.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Business Name is required.",
      });
    } else if (description.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Business Description is required.",
      });
    } else if (
      location.trim() === "" ||
      !longitude ||
      !latitude ||
      longitude?.trim() === "" ||
      latitude?.trim() === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Business Location is required.",
      });
    } else if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Business Email.",
      });
    } else if (!validatePhone(phone, 11)) {
      Toast.show({
        type: "error",
        text1: "Invalid Business phone number.",
      });
    } else if (website.trim().length > 0 && !validateUrl(website.trim())) {
      Toast.show({
        type: "error",
        text1: "Invalid Business Website.",
      });
    }else if (
      monday.trim() === "" ||
      tuesday.trim() === "" ||
      wednesday.trim() === "" ||
      thursday.trim() === "" ||
      friday.trim() === "" ||
      saturday.trim() === "" ||
      sunday.trim() === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Enter time of booking from monday to sunday.",
      });
    } else if (whatsapp.trim().length > 0 && !validatePhone(whatsapp, 11)) {
      Toast.show({
        type: "error",
        text1: "Whatsapp number must be 11 digits.",
      });
    } else if (facebook.trim().length > 0 && !isFacebookLink(facebook.trim())) {
      Toast.show({
        type: "error",
        text1: "Invalid facebook Link.",
      });
    } else if (
      instagram.trim().length > 0 &&
      !isInstagramLink(instagram.trim())
    ) {
      Toast.show({
        type: "error",
        text1: "Invalid instagram Link.",
      });
    } else if (twitter.trim().length > 0 && !isTwitterLink(twitter.trim())) {
      Toast.show({
        type: "error",
        text1: "Invalid twitter Link.",
      });
    } else if (linkedIn.trim().length > 0 && !isLinkedInLink(linkedIn.trim())) {
      Toast.show({
        type: "error",
        text1: "Invalid linkedin Link.",
      });
    } else {
      // dispatch(SET_LOADER(true));
      Toast.show({
        type: "success",
        text1: "Update in Progress"
      })
      navigation.goBack()
      editListing(
        {
          listing_id: route.params?.data?.id,
          listing_name: business,
          listing_address: location,
          listing_category_id: category?.id,
          amenity: amenities.map((item) => item.id.toString()),
          listing_description: description,
          listing_phone: phone,
          photo_list: selectedImages.map((item) => ({
            name: item?.fileName ||
                  "image." + item?.uri?.split(".").pop()?.toLowerCase(),
            uri: item?.uri,
            type: "image/" + item?.uri?.split(".").pop()?.toLowerCase(),
          })),
          video: selectedVideos.map((item) => ({
            name: item?.fileName ||
                  "video." + item?.uri?.split(".").pop()?.toLowerCase(),
            uri: item?.uri,
            type: "video/" + item?.uri?.split(".").pop()?.toLowerCase(),
          })),
          listing_featured_photo: logo
            ? {
                name:
                  logo?.fileName ||
                  "image." + logo?.uri?.split(".").pop()?.toLowerCase(),
                uri: logo?.uri,
                type: "image/" + logo?.uri?.split(".").pop()?.toLowerCase(),
              }
            : null,
          address_latitude: latitude,
          address_longitude: longitude,
          is_featured: true,
          listing_email: email,
          listing_oh_friday: friday.trim(),
          listing_oh_monday: monday.trim(),
          listing_oh_saturday: saturday.trim(),
          listing_oh_sunday: sunday.trim(),
          listing_oh_thursday: thursday.trim(),
          listing_oh_tuesday: tuesday.trim(),
          listing_oh_wednesday: wednesday.trim(),
          listing_status: "Active",
          listing_website: website.trim(),
          social_media: [
            facebook.trim().length > 0 && { icon: "Facebook", url: facebook },
            instagram.trim().length > 0 && {
              icon: "Instagram",
              url: instagram,
            },
            twitter.trim().length > 0 && { icon: "Twitter", url: twitter },
            linkedIn.trim().length > 0 && { icon: "LinkedIn", url: linkedIn },
            whatsapp.trim().length > 0 && {
              icon: "Whatsapp",
              url: `https://wa.me/${
                whatsapp.trim().charAt(0) === "0"
                  ? whatsapp.trim().slice(1)
                  : whatsapp.trim()
              }`,
            },
          ],
        },
        (response) => {
          Toast.show({
            type: "success",
            text1: response?.message,
          });
          // dispatch(SET_LOADER(false));
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
          // dispatch(SET_LOADER(false));
        }
      );
    }
  };
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
              title="Edit Listing"
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
              containerStyle={{
                width: "100%",
                backgroundColor: darkMode ? "transparent" : "white",
              }}
              className="rounded-full p-0"
              containerClassName="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
              editable={false}
              dropdown
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
              autoCapitalize={"none"}
              containerStyle={{
                width: "100%",
                backgroundColor: darkMode ? "transparent" : "white",
              }}
              className="rounded-full p-0"
              containerClassName="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
              editable={false}
              dropdown
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
              defaultValue={website || route.params?.data?.listing_website}
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
                .map(
                  (item) =>
                    item?.amenity_name || item?.amenity_details?.amenity_name
                )
                .join(", ")}
              placeholder="Select amenities for your business"
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              containerStyle={{
                width: "100%",
                backgroundColor: darkMode ? "transparent" : "white",
              }}
              className="rounded-full p-0"
              containerClassName="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
              editable={false}
              dropdown
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
              <View className="w-[28%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Replace Company Logo (Optional)
                </SmallText>
                {logo ? (
                  <View className="w-[100%] h-[60px] mb-3 relative">
                    <Image
                      source={{ uri: logo.uri }}
                      className="w-full h-full object-cover"
                    />
                    <Ionicons
                      name="close-circle"
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
                    className="w-[100%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                  >
                    <Entypo
                      name="plus"
                      size={27}
                      color={darkMode ? "#D4E1D2" : COLORS.primary}
                    />
                  </Pressable>
                )}
              </View>
              <View className="w-[28%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Replace images (Optional)
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
                      name="close-circle"
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
              <View className="w-[28%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Replace video (Optional)
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
                      name="close-circle"
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
            <Button
              text="Update Listing"
              buttonStyle={{ width: "100%" }}
              onPress={validate}
            />
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
          <View
            style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
            className="w-[100%] px-3 py-2 border bg-[#1b1b1b] mt-3 border-primary rounded-md flex-row justify-between items-center"
          >
            <AntDesign
              name="search1"
              size={20}
              color={darkMode ? "#D4E1D2" : "#696969"}
            />
            <TextInput
              keyboardType={"default"}
              className={`h-full flex-1 px-2 text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
              onChangeText={(value) => {
                setCategorySearch(value);
              }}
              value={categorySearch}
              placeholderTextColor={"#626262"}
              placeholder={"Search here..."}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              autoCapitalize={"none"}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Spacer value={H("3%")} axis="vertical" />}
            data={allCategory.filter((item) =>
              item?.listing_category_name
                ?.toLowerCase()
                .includes(categorySearch.toLowerCase())
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{ height: H("71%") }}
                >
                  <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                    Oops! No Category Found
                  </GradientText>
                </View>
              </>
            }
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
          <View
            style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
            className="w-[100%] px-3 py-2 border bg-[#1b1b1b] mt-3 border-primary rounded-md flex-row justify-between items-center"
          >
            <AntDesign
              name="search1"
              size={20}
              color={darkMode ? "#D4E1D2" : "#696969"}
            />
            <TextInput
              keyboardType={"default"}
              className={`h-full flex-1 px-2 text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
              onChangeText={(value) => {
                setAmenitySearch(value);
              }}
              value={amenitySearch}
              placeholderTextColor={"#626262"}
              placeholder={"Search here..."}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              autoCapitalize={"none"}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Spacer value={H("3%")} axis="vertical" />}
            data={allAmenities.filter((item) =>
              item?.amenity_name
                ?.toLowerCase()
                .includes(amenitySearch.toLowerCase())
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            ListEmptyComponent={
              <>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{ height: H("71%") }}
                >
                  <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                    Oops! No Amenity Found
                  </GradientText>
                  
                </View>
              </>
            }
            renderItem={({ item }) => (
              <Pressable
                className="w-[100%] h-auto flex-row items-center"
                onPress={() => {
                  const isItemInArray = amenities.some((obj) =>
                    obj?.amenity_details
                      ? obj?.amenity_details?.id === item.id
                      : obj?.id === item.id
                  );

                  if (isItemInArray) {
                    setAmenities((prev: any) =>
                      prev.filter((obj: any) =>
                        obj?.amenity_details
                          ? obj?.amenity_details?.id !== item.id
                          : obj?.id !== item.id
                      )
                    );
                  } else {
                    setAmenities((prev: any) => [...prev, item]);
                  }
                }}
              >
                {amenities.some(
                  (data) =>
                    data?.amenity_name === item?.amenity_name ||
                    data?.amenity_details?.amenity_name === item?.amenity_name
                ) && (
                  <Entypo
                    name="check"
                    size={19}
                    color={COLORS.primary}
                    className="mr-2"
                  />
                )}
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
            textInputProps={{
              placeholderTextColor: darkMode ? "#c6c6c6" : "#000",
            }}
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
              components: "country:NG"
            }}
            fetchDetails={true}
            enablePoweredByContainer={true}
            renderRow={(rowData) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Ionicons
                  name="location-sharp"
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
    </>
  );
};

export default EditListing;
