import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacer } from "../../components";
import CategoryCard from "../../components/categoryCard";
import TitleWithButton from "../../components/titleWithButton";
import { CATEGORIES } from "../../data/category";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import UserProfileCard from "../../components/userProfileCard";
import { MAIN_USERS } from "../../data/listing";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { getAllListing, getAmenities } from "../../api/category";
import Toast from "react-native-toast-message";
import { GradientText } from "../../components/gradientText";

const Listing = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const [allListing, setAllListing] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getAllListing(
        null,
        (response) => {
          dispatch(SET_LOADER(false));
          setAllListing(response.listing);
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
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-5 bg-[#0f0f0f]"
        >
          <TitleWithButton
            title="All Listing"
            fire={() => navigation.goBack()}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allListing}
          className="px-3"
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <>
              <View
                className="flex-1 w-full h-full justify-center items-center"
                style={{ height: H("71%") }}
              >
                <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                  Nothing Yet
                </GradientText>
              </View>
            </>
          }
          ItemSeparatorComponent={() => (
            <Spacer value={H("1%")} axis="vertical" />
          )}
          renderItem={({ item }) => (
            <UserProfileCard
              navigation={navigation}
              item={item}
              onPress={() =>
                navigation.navigate("FreelancerProfile", { data: item })
              }
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Listing;
