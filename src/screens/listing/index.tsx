import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,

} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Spacer,SmallText } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import UserProfileCard from "../../components/userProfileCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { getAllListing } from "../../api/category";
import Toast from "react-native-toast-message";
import { GradientText } from "../../components/gradientText";
import { SET_TYPE } from "../../store/searchSlice";
import { AntDesign } from "@expo/vector-icons"; 

const Listing = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const [allListing, setAllListing] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number | undefined>();
  const ref = React.useRef<boolean>(false);
  const { location, search } = useSelector((state: RootState) => state.search);

  React.useEffect(() => {
    if (focus && !ref.current) {
      dispatch(SET_LOADER(true));
      getAllListing(
        { page },
        (response) => {
          dispatch(SET_LOADER(false));
          setAllListing([...response.listing.data]);
          ref.current = true;
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
    }
    return () => {
      setPage(1);
      ref.current = false;
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
        {/* <View
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-5 bg-[#0f0f0f]"
        > */}
          <TitleWithButton
            title="All Services"
            fire={() => navigation.goBack()}
          />
           <Pressable
              onPress={() => {
                dispatch(SET_TYPE("name"));
                navigation.navigate("Search");
              }}
              style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
              className="w-[100%] mx-auto px-3 py-3 border border-primary rounded-full flex-row items-center"
            >
              <AntDesign
                name="search1"
                size={24}
                color={darkMode ? "#D4E1D2" : "#696969"}
              />
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
                className="text-[#D4E1D2] text-left p-0 pl-3"
              >
                {search === "" ? "Search here" : search}
              </SmallText>
            </Pressable>
        {/* </View> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allListing}
          className="px-3"
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            page ? (
              <>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{ height: H("71%") }}
                >
                  <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                    Oops! No Services Found
                  </GradientText>
                  <Spacer value={H("2%")} axis="vertical" />
                  <Button
                    text="Go to Home"
                    onPress={() => navigation.navigate("Dashboard")}
                    buttonStyleClassName="rounded-md"
                    buttonStyle={{ width: "100%" }}
                  />
                </View>
              </>
            ) : null
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
          onEndReached={() => {
            dispatch(SET_LOADER(true));
            getAllListing(
              { page },
              (response) => {
                dispatch(SET_LOADER(false));
                setAllListing([...allListing, ...response.listing.data]);
                // ref.current = true;
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
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Listing;
