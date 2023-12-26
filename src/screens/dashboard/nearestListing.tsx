import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Spacer } from "../../components";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { GradientText } from "../../components/gradientText";
import Toast from "react-native-toast-message";
import { getAllListing } from "../../api/category";
import { SET_LOADER } from "../../store/formDataSlice";

const NearestListing = ({
  navigation,
  route,
}: {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const [nearest, setNearest] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number | undefined>();
  const ref = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (focus && !ref.current) {
      dispatch(SET_LOADER(true));
      getAllListing(
        {
          page,
          listing_city: profile?.city || "",
          is_nearest: true,
        },
        (response) => {
          setNearest([...response.listing?.data]);
          dispatch(SET_LOADER(false));
          ref.current = true;
          setPage(response?.listing?.current_page + 1)
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
    return () => {
      ref.current = false;
      setPage(1);
    };
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
            title="Nearest Listing"
            fire={() => navigation.goBack()}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={nearest}
          className="px-3"
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("1%")} axis="vertical" />
          )}
          ListEmptyComponent={
            page ? 
            <>
              <View
                className="flex-1 w-full h-full justify-center items-center"
                style={{ height: H("71%") }}
              >
                <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                  Oops! No Listing Found
                </GradientText>
                <Spacer value={H("2%")} axis="vertical" />
                <Button
                  text="Back to Home"
                  onPress={() => navigation.navigate("Dashboard")}
                  buttonStyleClassName="rounded-md"
                  buttonStyle={{ width: "100%" }}
                />
              </View>
            </> : null
          }
          onEndReached={() => {
            dispatch(SET_LOADER(true));
            getAllListing(
              {
                page,
                listing_city: profile?.city || "",
                is_nearest: true,
              },
              (response) => {
                setNearest([...nearest, ...response.listing?.data]);
                dispatch(SET_LOADER(false));
                setPage(response?.listing?.current_page + 1);
              },
              (error) => {
                dispatch(SET_LOADER(false));
                Toast.show({
                  type: "error",
                  text1: error,
                });
              }
            );
          }} // Load more data when the user reaches the end
          onEndReachedThreshold={0.1}
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

export default NearestListing;
