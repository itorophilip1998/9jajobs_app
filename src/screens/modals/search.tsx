import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SliderIcon from "../../components/sliderIcon";
import { COLORS } from "../../utility/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { RootState } from "../../store";
import { SET_LOCATION, SET_SEARCH } from "../../store/searchSlice";
import { width, height } from "../../utility/constant";
import { FONTS } from "../../utility/fonts";
import { BottomSheet, SmallText } from "../../components";
import RBSheet from "react-native-raw-bottom-sheet";

const Search = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const { location, search, type } = useSelector(
    (state: RootState) => state.search
  );
  const dispatch = useDispatch();
  const ref = React.useRef<RBSheet | null>(null);

  const [searchResults, setSearchResults] = React.useState([]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "white",
      }}
    >
      <SafeAreaView
        style={{ backgroundColor: darkMode ? "black" : "white" }}
        className="flex-1 bg-black px-3 py-4"
      >
        <View className="w-full flex-row items-center justify-between">
          <Pressable
            style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
            className="w-[50%] px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row justify-between items-center"
          >
            <AntDesign
              name="search1"
              size={20}
              color={darkMode ? "#D4E1D2" : "#696969"}
            />
            <TextInput
              keyboardType={"web-search"}
              className={`h-full w-[80%] text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
              onChangeText={(value) => dispatch(SET_SEARCH(value))}
              value={search}
              // onFocus={() => {
              //   onFocus && onFocus();
              // }}
              // onBlur={() => {
              //   onBlur && onBlur();
              // }}
              placeholderTextColor={"#626262"}
              placeholder={"Search for Category"}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              autoCapitalize={"none"}
            />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: darkMode ? "#1b1b1b" : "transparent",
              borderWidth: darkMode ? 0 : 1,
              borderColor: COLORS.primary,
            }}
            onPress={() => ref.current?.open()}
            className="w-[30%] px-3 py-2 bg-[#1b1b1b] rounded-full flex-row items-center justify-between"
          >
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#696969" }}
              className="text-[#D4E1D2] text-left p-0 pr-2"
            >
              {/* {location === "" ? "Location" : location} */}
              Location
            </SmallText>
            <AntDesign name="downcircleo" size={13} color={COLORS.primary} />
          </Pressable>
          <SliderIcon onPress={() => navigation.navigate("Filter")} />
          <AntDesign
            name="closecircleo"
            size={20}
            color={darkMode ? "#D4E1D2" : "#696969"}
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
      <BottomSheet ref={ref} duration={0}>
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
              types: "(cities)",
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

export default Search;
