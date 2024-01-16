import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SliderIcon from "../../components/sliderIcon";
import { COLORS } from "../../utility/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { RootState } from "../../store";
import { SET_LOCATION, SET_SEARCH } from "../../store/searchSlice";
import { width, height } from "../../utility/constant";
import { FONTS } from "../../utility/fonts";
import { BottomSheet, Button, SmallText, Spacer } from "../../components";
import RBSheet from "react-native-raw-bottom-sheet";
import { SET_LOADER } from "../../store/formDataSlice";
import { getAllListing } from "../../api/category";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import UserProfileCard from "../../components/userProfileCard";
import { DelayFor } from "../../utility/helpers";
import { GradientText } from "../../components/gradientText";
import BorderBottom from "../../components/borderBottom";

const Search = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const { location, search } = useSelector((state: RootState) => state.search);
  const [longtitude, setLongtitude] = React.useState<string | null>(null);
  const [latitude, setLatitude] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const ref = React.useRef<RBSheet | null>(null);

  const [searchResults, setSearchResults] = React.useState<any>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const handleSearch = (loading: boolean = true) => {
    loading && dispatch(SET_LOADER(true));
    getAllListing(
      {
        // listing_name: search,
        // listing_city: location,
        autocomplete: true,
      },
      (response) => {
        loading && dispatch(SET_LOADER(false));
        setLoaded(true);
        setSearchResults(response.auto_complete);
      },
      (error) => {
        setLoaded(true);
        loading && dispatch(SET_LOADER(false));
        Toast.show({
          type: "error",
          text1: error,
        });
      }
    );
  };

  React.useEffect(() => {
    if (focus) {
      handleSearch();
    }
  }, [focus, location]);

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
      <SafeAreaView
        style={{ backgroundColor: darkMode ? "black" : "#D4E1D2" }}
        className="flex-1 bg-black px-3 py-4"
      >
        <View className="w-full flex-row items-center justify-between">
          <Pressable
            style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
            className="w-[60%] px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row justify-between items-center"
          >
            <AntDesign
              name="search1"
              size={20}
              color={darkMode ? "#D4E1D2" : "#696969"}
            />
            <TextInput
              keyboardType={"default"}
              className={`h-full w-[80%] text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
              onChangeText={(value) => {
                dispatch(SET_SEARCH(value));
                // handleSearch(false);
              }}
              value={search}
              // onFocus={() => {
              //   onFocus && onFocus();
              // }}
              // onBlur={handleSearch}
              placeholderTextColor={"#626262"}
              placeholder={"Search here..."}
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              autoCapitalize={"none"}
              onSubmitEditing={() =>
                navigation.navigate("SearchResult", {
                  data: {
                    search,
                    location,
                  },
                })
              }
            />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: darkMode ? "#1b1b1b" : "white",
              borderWidth: darkMode ? 0 : 1,
              borderColor: COLORS.primary,
            }}
            onPress={() => ref.current?.open()}
            className="w-[30%] px-3 py-2 bg-[#1b1b1b] rounded-full flex-row items-center justify-between"
          >
            <SmallText
              numberOfLine={1}
              style={{ color: darkMode ? "#D4E1D2" : "#696969" }}
              className="text-[#D4E1D2] text-left p-0 pr-2 w-[90%]"
            >
              {location === "" ? "Location" : location}
            </SmallText>
            <AntDesign
              name={location === "" ? "downcircleo" : "closecircleo"}
              size={13}
              color={COLORS.primary}
              onPress={() => location !== "" && dispatch(SET_LOCATION(""))}
            />
          </Pressable>
          {/* <SliderIcon onPress={() => navigation.navigate("Filter")} /> */}
          <AntDesign
            name="closecircleo"
            size={20}
            color={darkMode ? "#D4E1D2" : "#696969"}
            onPress={() => {
              dispatch(SET_SEARCH(""));
              dispatch(SET_LOCATION(""));
              setLongtitude(null);
              setLatitude(null);
              navigation.goBack();
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            searchResults && [
              ...searchResults?.listing_category_name?.filter((item: any) =>
                item.toLowerCase().trim().includes(search.trim().toLowerCase())
              ),
              ...searchResults?.listing_name?.filter((item: any) =>
                item.toLowerCase().trim().includes(search.trim().toLowerCase())
              ),
            ]
          }
          // className="px-2"
          ListHeaderComponent={() => <Spacer value={H("2%")} axis="vertical" />}
          keyExtractor={(item, idx) => idx.toString()}
          ItemSeparatorComponent={() => (
            <>
              <Spacer value={H("0.5%")} axis="vertical" />
              <BorderBottom />
              <Spacer value={H("0.5%")} axis="vertical" />
            </>
          )}
          ListEmptyComponent={
            loaded ? (
              <>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{ height: H("71%") }}
                >
                  <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                    Oops! No result found
                  </GradientText>
                  <Spacer value={H("2%")} axis="vertical" />
                  <Button
                    text="Back to Home"
                    onPress={() => navigation.navigate("Dashboard")}
                    buttonStyleClassName="rounded-md"
                  />
                </View>
              </>
            ) : null
          }
          renderItem={({ item }) => (
            <Pressable
              className="py-2"
              onPress={() => {
                const type = item.split(" (");
                if (type[1].toLowerCase().includes("category")) {
                  navigation.navigate("SearchResult", {
                    data: {
                      search: type[0].trim(),
                      location,
                    },
                  });
                } else if (type[1].toLowerCase().includes("business")) {
                  dispatch(SET_LOADER(true));
                  getAllListing(
                    { listing_name: item.split(" (")[0] },
                    (newData) => {
                      dispatch(SET_LOADER(false));
                      navigation.navigate("FreelancerProfile", {
                        data: newData?.listing?.data[0],
                      });
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
              }}
            >
              <SmallText
                numberOfLine={1}
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-left text-[16px]"
              >
                {item}
              </SmallText>
            </Pressable>
          )}
        />
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={}
          // className="px-2"
          ListHeaderComponent={() => <Spacer value={H("2%")} axis="vertical" />}
          keyExtractor={(item, idx) => idx.toString()}
          ItemSeparatorComponent={() => (
            <>
              <Spacer value={H("0.5%")} axis="vertical" />
              <BorderBottom />
              <Spacer value={H("0.5%")} axis="vertical" />
            </>
          )}
          renderItem={({ item }) => (
            <Pressable
              className="py-2"
              onPress={() => {
                
              }}
            >
              <SmallText
                numberOfLine={1}
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-left text-[16px]"
              >
                {item}
              </SmallText>
            </Pressable>
          )}
        /> */}
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
            onPress={(data, details = null) => {
              const city = details?.address_components.find(
                (item) => item.types[0] === "locality"
              );
              const country = details?.address_components.find(
                (item) => item.types[0] === "country"
              );
              dispatch(SET_LOCATION(`${city?.long_name}`));
              setLatitude(
                details ? details.geometry.location.lat.toString() : null
              );
              setLongtitude(
                details ? details.geometry.location.lng.toString() : null
              );
              ref.current?.close();
              DelayFor(200, () => {
                dispatch(SET_LOADER(true));
                getAllListing(
                  {
                    // listing_name: search,
                    autocomplete: true,
                    listing_city: `${city?.long_name}`,
                  },
                  (response) => {
                    dispatch(SET_LOADER(false));
                    setSearchResults(response.listing);
                  },
                  (error) => {
                    dispatch(SET_LOADER(false));
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                  }
                );
              });
            }}
            query={{
              key: "AIzaSyC6yqP8_qWQsmhyqkSrAgTm7CUQ6yHwzRY",
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
                height: 40,
              },
            }}
          />
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default Search;
