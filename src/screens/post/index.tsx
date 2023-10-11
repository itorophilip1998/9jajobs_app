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

const Post = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [business, setBusiness] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [website, setWebsite] = React.useState<string>("");
  const [amenities, setAmenities] = React.useState<string>("");
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = React.useState<string[]>([]);
  const { darkMode } = useSelector((state: RootState) => state.auth);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Enable multiple selection
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        setSelectedImages((prev) => [...prev, result.assets[i].uri || ""]);
      }
    }
  };

  const pickVideos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true, // Enable multiple selection
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        setSelectedVideos((prev) => [...prev, result.assets[i].uri || ""]);
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
              Business Name
            </SmallText>
            <Spacer axis="vertical" value={H(2)} />
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
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setDescription(value)}
              defaultValue={description}
              placeholder="Describe your business here"
              containerStyle={{ width: "100%" }}
              type={"default"}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              autoCapitalize={"none"}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
            />
            <Spacer axis="vertical" value={H(2)} />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
              className="text-[#D4E1D2] text-left p-0"
            >
              Category
            </SmallText>
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setCategory(value)}
              style={{ backgroundColor: darkMode ? "transparent" : "white" }}
              defaultValue={category}
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
              Location
            </SmallText>
            <Spacer axis="vertical" value={H(2)} />
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
            <Spacer axis="vertical" value={H(2)} />
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
            <Spacer axis="vertical" value={H(2)} />
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
            <Spacer axis="vertical" value={H(2)} />
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
            <Spacer axis="vertical" value={H(2)} />
            <InputField
              onTextChange={(value) => setAmenities(value)}
              defaultValue={amenities}
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
            <View className="flex-row w-full justify-between items-start">
              <View className="w-[47%] flex-row flex-wrap justify-between items-center">
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
                      source={{ uri: item }}
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
              <View className="w-[47%] flex-row flex-wrap justify-between items-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="w-full text-[#D4E1D2] text-left p-0 pb-3"
                >
                  Add Videos
                </SmallText>
                {selectedVideos.map((item, idx) => (
                  <View
                    key={idx.toString()}
                    className="w-[45%] h-[60px] mb-3 relative"
                  >
                    <Video
                      source={{ uri: item }}
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
            <Button text="Post Ad" />
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
            data={CATEGORIES}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[100%] h-auto flex-row items-center"
                onPress={() => {
                  setCategory(item.title);
                  categoryRef.current?.close();
                }}
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-left text-[#D4E1D2] p-0 font-ManropeSemiBold text-[15px]"
                >
                  {item.title}
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
            data={["Home Delivery", "Nationwide Delivery"]}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            renderItem={({ item }) => (
              <Pressable
                className="w-[100%] h-auto flex-row items-center"
                onPress={() => {
                  setAmenities(item);
                  amenitiesRef.current?.close();
                }}
              >
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-left text-[#D4E1D2] p-0 font-ManropeSemiBold text-[15px]"
                >
                  {item}
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
                color: darkMode ? "#D4E1D2" : "#0f0f0f",
                fontSize: 15,
                borderWidth: 1,
                borderColor: COLORS.primary,
                height: "50px",
              },
            }}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default Post;
