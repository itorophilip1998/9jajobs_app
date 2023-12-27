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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { SET_LOADER } from "../../store/formDataSlice";
import { getAllListing } from "../../api/category";
import Toast from "react-native-toast-message";
import { GradientText } from "../../components/gradientText";

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
  const [page, setPage] = React.useState<number | undefined>();
  const ref = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (focus && !ref.current) {
      dispatch(SET_LOADER(true));
      getAllListing(
        { listing_category_id: route.params?.data.id, page },
        (response) => {
          dispatch(SET_LOADER(false));
          setListing([...response?.listing?.data]);
          ref.current = true;
          setPage(response.listing.current_page + 1)
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
          ListEmptyComponent={
            page ? (
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
                    text="Back to Categories"
                    onPress={() => navigation.goBack()}
                    buttonStyleClassName="rounded-md"
                    buttonStyle={{ width: "100%" }}
                  />
                </View>
              </>
            ) : null
          }
          onEndReached={() => {
            dispatch(SET_LOADER(true));
            getAllListing(
              { listing_category_id: route.params?.data.id, page },
              (response) => {
                dispatch(SET_LOADER(false));
                setListing([...listings, ...response?.listing?.data]);
                setPage(response.listing.current_page + 1);
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

export default Freelancers;
