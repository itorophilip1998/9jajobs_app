import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { FirstLetterUppercase, convertToWords, toggleStringInArray } from "../../utility/helpers";
import { FONTS } from "../../utility/fonts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { getUserListing } from "../../api/category";
import Toast from "react-native-toast-message";
import UserProfileCard from "../../components/userProfileCard";
import { verifyListing } from "../../api/verification";
import { GradientText } from "../../components/gradientText";
import { getFreeDiskStorageAsync } from "expo-file-system";

const allServices = [
  "Sole",
  "Private",
  "Public",
  "Limited",
  "Unlimited",
  "Guaranteed",
  "Remote",
];

const Verification = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const [listing, setListing] = React.useState<any[]>([]);

  const [detail, setDetail] = React.useState<any>(null);
  const [regNo, setRegNo] = React.useState<string>("");
  const [idFront, setIdFront] = React.useState<any>(null);
  const [skill, setSkill] = React.useState<any>(null);
  const [idBack, setIdBack] = React.useState<any>(null);
  const [cac, setCac] = React.useState<any>(null);
  const [utility, setUtility] = React.useState<any>(null);
  const [services, setServices] = React.useState<string[]>([]);
  const [isChecked, setChecked] = React.useState<boolean>(false);
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const { verification_amount: amount } = useSelector(
    (state: RootState) => state.formData.dynamicForm
  );

  const pickFile = async () => {
    const freeSpace = await getFreeDiskStorageAsync();
    if (freeSpace < 100) {
      Toast.show({
        type: "error",
        text1: "Please free up space to 100mb",
      });
      return;
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept any file type
        copyToCacheDirectory: true, // Copy the file to a temporary location
      });

      if (!result.canceled) {
        setCac(result.assets[0]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong. Please try again or check setting if permission is enabled.",
        [{ text: "Ok" }]
      );
      console.error("Error picking file:", error);
    }
  };

  const pickImages = async (
    type: "idFront" | "idBack" | "skill" | "utility"
  ) => {
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
      });

      if (!result.canceled) {
        if (type === "idFront") {
          setIdFront(result.assets[0]);
        } else if (type === "idBack") {
          setIdBack(result.assets[0]);
        } else if (type === "skill") {
          setSkill(result.assets[0]);
        } else if (type === "utility") {
          setUtility(result.assets[0]);
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

  const businessRef = React.useRef<RBSheet | null>(null);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getUserListing(
        null,
        (response) => {
          dispatch(SET_LOADER(false));
          setListing(response);
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
  }, [focus]);

  const validate = () => {
    if (!detail) {
      Toast.show({
        type: "error",
        text1: "Select a Business to Verify",
      });
    } else if (regNo === "") {
      Toast.show({
        type: "error",
        text1: "Enter Business Registration Number",
      });
    } else if (!idFront) {
      Toast.show({
        type: "error",
        text1: "Please upload the front of your ID card",
      });
    } else if (!isChecked) {
      Toast.show({
        type: "error",
        text1: "Please agree to terms and conditions to proceed.",
      });
    } else {
      dispatch(SET_LOADER(true));
      verifyListing(
        {
          cac_document: cac
            ? {
                name:
                  cac?.name ||
                  "document." + cac?.uri?.split(".").pop()?.toLowerCase(),
                uri: cac?.uri,
                type:
                  "application/" + cac?.uri?.split(".").pop()?.toLowerCase(),
              }
            : null,
          id_card_back: idBack
            ? {
                name:
                  idBack?.fileName ||
                  "image." + idBack?.uri?.split(".").pop()?.toLowerCase(),
                uri: idBack?.uri,
                type: "image/" + idBack?.uri?.split(".").pop()?.toLowerCase(),
              }
            : null,
          id_card_front: idFront
            ? {
                name:
                  idFront?.fileName ||
                  "image." + idFront?.uri?.split(".").pop()?.toLowerCase(),
                uri: idFront?.uri,
                type: "image/" + idFront?.uri?.split(".").pop()?.toLowerCase(),
              }
            : null,
          listing_id: detail?.id || "",
          proof_address: utility
            ? {
                name:
                  utility?.fileName ||
                  "image." + utility?.uri?.split(".").pop()?.toLowerCase(),
                uri: utility?.uri,
                type: "image/" + utility?.uri?.split(".").pop()?.toLowerCase(),
              }
            : null,
          reg_number: regNo,
          services,
          skill_certificate: skill
            ? {
                name:
                  skill?.fileName ||
                  "image." + skill?.uri?.split(".").pop()?.toLowerCase(),
                uri: skill?.uri,
                type: "image/" + skill?.uri?.split(".").pop()?.toLowerCase(),
              }
            : null,
        },
        (response) => {
          setDetail(null);
          setRegNo("");
          setIdFront(null);
          setSkill(null);
          setIdBack(null);
          setCac(null);
          setUtility(null);
          setServices([]);
          setChecked(false);
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "success",
            text1: response.message,
          });
          navigation.goBack();
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
      <SafeAreaView className="flex-1 w-full pb-4">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton
            title="Verification"
            fire={() => navigation.goBack()}
          />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <ScrollView className="px-3 flex-1">
          <InputField
            onTextChange={(value) => {}}
            defaultValue={
              listing.find((item) => item.id === detail?.id)?.listing_name || ""
            }
            placeholder="Select Business"
            // placeholderTextColor={darkMode ? "#fff" : "#000"}
            type={"default"}
            containerStyle={{ width: "100%" }}
            autoCapitalize={"none"}
            className="rounded-none p-0"
            containerClassName="border-[#626262] border-b rounded-none p-0"
            dropdown
            editable={false}
            suffixIcon={
              <Feather name="chevron-down" size={24} color="#626262" />
            }
            onSuffixTap={() => businessRef.current?.open()}
          />
          <InputField
            onTextChange={(value) => setRegNo(value)}
            defaultValue={regNo}
            placeholder="Registration Number"
            // placeholderTextColor={darkMode ? "#c6c6c6" : "#000"}
            type={"default"}
            autoCapitalize={"words"}
            containerStyle={{ width: "100%" }}
            className="border-[#626262] border-b focus:border-primary rounded-none p-0 mb-3 w-full"
          />
          <Spacer value={H("2%")} axis="vertical" />
          <View className="flex-row w-full justify-start items-start flex-wrap">
            <View className="w-[27%] mr-6 mb-3 flex-row flex-wrap justify-between items-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="w-full text-[#D4E1D2] text-left p-0 pb-3"
              >
                Upload ID card front
              </SmallText>
              {idFront ? (
                <View className="w-[85%] h-[60px] mb-3 relative">
                  <Image
                    source={{ uri: idFront.uri }}
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
                    onPress={() => setIdFront(null)}
                  />
                </View>
              ) : (
                <Pressable
                  onPress={() => pickImages("idFront")}
                  style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
                  className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo
                    name="plus"
                    size={27}
                    color={darkMode ? "#D4E1D2" : COLORS.primary}
                  />
                </Pressable>
              )}
            </View>
            <View className="w-[27%] mr-6 mb-3 flex-row flex-wrap justify-between items-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="w-full text-[#D4E1D2] text-left p-0 pb-3"
              >
                Upload ID card back
              </SmallText>
              {idBack ? (
                <View className="w-[85%] h-[60px] mb-3 relative">
                  <Image
                    source={{ uri: idBack.uri }}
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
                    onPress={() => setIdBack(null)}
                  />
                </View>
              ) : (
                <Pressable
                  style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
                  onPress={() => pickImages("idBack")}
                  className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo
                    name="plus"
                    size={27}
                    color={darkMode ? "#D4E1D2" : COLORS.primary}
                  />
                </Pressable>
              )}
            </View>
            <View className="w-[27%] mr-6 mb-3 flex-row flex-wrap justify-between items-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="w-full text-[#D4E1D2] text-left p-0 pb-3"
              >
                Upload Skill Certificate
              </SmallText>
              {skill ? (
                <View className="w-[85%] h-[60px] mb-3 relative">
                  <Image
                    source={{ uri: skill?.uri }}
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
                    onPress={() => setSkill(null)}
                  />
                </View>
              ) : (
                <Pressable
                  style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
                  onPress={() => pickImages("skill")}
                  className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo
                    name="plus"
                    size={27}
                    color={darkMode ? "#D4E1D2" : COLORS.primary}
                  />
                </Pressable>
              )}
            </View>
            <View className="w-[27%] mr-6 mb-3 flex-row flex-wrap justify-between items-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="w-full text-[#D4E1D2] text-left p-0 pb-3"
              >
                Utility Bill
              </SmallText>
              {utility ? (
                <View className="w-[85%] h-[60px] mb-3 relative">
                  <Image
                    source={{ uri: utility?.uri }}
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
                    onPress={() => setUtility(null)}
                  />
                </View>
              ) : (
                <Pressable
                  style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
                  onPress={() => pickImages("utility")}
                  className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
                >
                  <Entypo
                    name="plus"
                    size={27}
                    color={darkMode ? "#D4E1D2" : COLORS.primary}
                  />
                </Pressable>
              )}
            </View>
            <View className="w-[27%] mr-6 mb-3 flex-row flex-wrap justify-between items-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="w-full text-[#D4E1D2] text-left p-0 pb-3"
              >
                CAC Certificate
              </SmallText>

              <Pressable
                onPress={pickFile}
                style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
                className="w-[80%] h-[55px] bg-[#0F0F0F] justify-center items-center rounded-lg"
              >
                <Entypo
                  name={cac ? "check" : "plus"}
                  size={27}
                  color={
                    darkMode
                      ? cac
                        ? COLORS.primary
                        : "#D4E1D2"
                      : COLORS.primary
                  }
                />
              </Pressable>
            </View>
          </View>
          <Spacer value={H("2%")} axis="vertical" />
          <View className="flex-row items-center flex-wrap">
            {allServices.map((item, idx) => (
              <View key={idx} className="flex-row items-center mb-3 mr-3">
                <Checkbox
                  color={COLORS.primary}
                  value={services.includes(item)}
                  onValueChange={(e) =>
                    setServices((prevState) =>
                      toggleStringInArray(prevState, item)
                    )
                  }
                />
                <SmallText className="text-[#696969] text-left p-0 ml-2">
                  {item}
                </SmallText>
              </View>
            ))}
          </View>

          <Spacer value={H("2%")} axis="vertical" />
          <View className="px-3 flex-row items-center">
            <Checkbox
              color={COLORS.primary}
              value={isChecked}
              onValueChange={setChecked}
            />
            <SmallText
              onPress={() => navigation.navigate("Terms")}
              className="text-[15px] !text-[#696969] text-left !pl-3"
            >
              By applying, you agree to our{" "}
              <Text
                className="text-primary underline"
                onPress={() => navigation.navigate("Terms")}
              >
                Terms & Conditions
              </Text>{" "}
              and{" "}
              <Text
                className="text-primary underline"
                onPress={() => navigation.navigate("Privacy")}
              >
                Privacy Policy
              </Text>
            </SmallText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <Button
            text="Apply"
            buttonStyle={{ width: "100%" }}
            onPress={validate}
          />
          <Spacer value={H("1%")} axis="vertical" />
          <SmallText className="text-[15px] !text-[#696969] text-left !pl-3">
            <Text className="font-RedHatDisplayBold">NOTE:</Text>{" "}
            {FirstLetterUppercase(convertToWords(Number(amount)))}{" naira "}
            <Text className="font-RedHatDisplaySemiBold text-primary">
              (₦{Number(amount).toLocaleString()})
            </Text>{" "}
            will be deducted from your wallet for verification.
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
        </ScrollView>
      </SafeAreaView>

      {/* POPUP FOR GOOGLE PLACES LOCATION FOR HOME ADDRESS */}
      <BottomSheet ref={businessRef} duration={0}>
        {/* <View className="flex-1 bg-[#1b1b1b] py-3 px-3"></View> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          data={listing.filter(
            (item) => item?.verified?.status !== "completed"
          )}
          className="px-3 flex-1 py-3 bg-[#1b1b1b]"
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("1%")} axis="vertical" />
          )}
          ListEmptyComponent={
            <>
              <View
                className="flex-1 w-full h-full justify-center items-center"
                style={{ height: H("40%") }}
              >
                <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                  Oops! No Business Found
                </GradientText>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <UserProfileCard
              navigation={navigation}
              item={item}
              hide={true}
              onPress={() => {
                businessRef.current?.close();
                setDetail(item);
              }}
            />
          )}
        />
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default Verification;
