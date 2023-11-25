import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { SET_LOADER } from "../../store/formDataSlice";
import { getAllListing } from "../../api/category";
import Toast from "react-native-toast-message";

const Freelancers = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [listings, setListing] = React.useState<any[]>([]);
  // console.log(route.params?.data);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getAllListing(
        { listing_category_id: route.params?.data.id },
        (response) => {
          dispatch(SET_LOADER(false));
          setListing(response.listing);
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
  }, [focus, route.params?.data]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-3"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#D4E1D2",
      }}
    >
      <SafeAreaView className="flex-1 w-full">
        <TitleWithButton
          title={route.params?.data.listing_category_name}
          fire={() => navigation.goBack()}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listings}
          keyExtractor={(item, idx) => idx.toString()}
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

export default Freelancers;
