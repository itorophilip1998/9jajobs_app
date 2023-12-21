import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, SmallText, Spacer } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { COLORS } from "../../utility/colors";
import { Entypo } from "@expo/vector-icons";
import { shadowBox, shadowBoxDark } from "../../style/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useIsFocused } from "@react-navigation/native";
import { SET_LOADER } from "../../store/formDataSlice";
import { getPackages, subscribePackage } from "../../api/packages";
import Toast from "react-native-toast-message";
import { getUser } from "../../api/user";
import { SET_PROFILE } from "../../store/authSlice";
import { GradientText } from "../../components/gradientText";

const Packages = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const [packages, setPackages] = React.useState<any>(null);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getPackages(
        (response) => {
          setPackages(response?.package);
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
      <SafeAreaView className="flex-1 w-full pb-4">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-transparent"
        >
          <TitleWithButton title="Packages" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <FlatList
          className="px-3"
          showsVerticalScrollIndicator={false}
          data={packages}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("2%")} axis="vertical" />
          )}
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
          renderItem={({ item }) => (
            <View
              style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
              className="w-full bg-[#0F0F0F] px-3 py-3 rounded-xl mb-5"
            >
              <View className="flex-row items-start justify-between w-full">
                <SmallText
                  style={{ color: darkMode ? "white" : "#0f0f0f" }}
                  className="text-white text-left text-[20px] p-0 w-[48%]"
                >
                  {item?.package_name}
                </SmallText>
                <SmallText className="text-primary text-left font-RedHatDisplayBold text-[20px] p-0 w-[48%]">
                  ₦{item?.package_price}/{item?.valid_days} days
                </SmallText>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    {item?.total_listings} listing allowed
                  </SmallText>
                </View>
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    {item?.total_amenities} amenities per listing
                  </SmallText>
                </View>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    {item?.total_photos} photos per listing
                  </SmallText>
                </View>
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    {item?.total_videos} videos per listing
                  </SmallText>
                </View>
              </View>
              <Spacer value={H("3%")} axis="vertical" />
              <View className="flex-row items-start justify-between w-full">
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    {item?.total_social_items} social items per listing
                  </SmallText>
                </View>
                <View className="flex-row items-start w-[48%]">
                  <Entypo name="check" size={24} color={COLORS.primary} />
                  <SmallText
                    style={{ color: darkMode ? "white" : "#0f0f0f" }}
                    className="text-white text-left text-[16px] p-0 w-[85%]"
                  >
                    {item?.total_additional_features} additional features per
                    listing
                  </SmallText>
                </View>
              </View>
              {item?.allow_featured === "Yes" && (
                <>
                  <Spacer value={H("3%")} axis="vertical" />
                  <View className="flex-row items-start justify-between w-full">
                    <View className="flex-row items-start w-[48%]">
                      <Entypo name="check" size={24} color={COLORS.primary} />
                      <SmallText
                        style={{ color: darkMode ? "white" : "#0f0f0f" }}
                        className="text-white text-left text-[16px] p-0 w-[85%]"
                      >
                        featured listing allowed
                      </SmallText>
                    </View>
                  </View>
                </>
              )}
              <Spacer value={H("3%")} axis="vertical" />
              <Button
                text={
                  item?.id === profile?.package?.purchase_details?.id
                    ? "Active Package"
                    : "Enroll Now"
                }
                buttonStyleClassName="rounded-lg"
                disabled={Boolean(
                  item?.id === profile?.package?.purchase_details?.id
                )}
                buttonStyle={{ width: "100%" }}
                onPress={
                  item?.id !== profile?.package?.purchase_details?.id
                    ? () => {
                        dispatch(SET_LOADER(true));
                        subscribePackage(
                          { package_id: item?.id, duration: item?.valid_days },
                          (response1) => {
                            getUser(
                              (response) => {
                                dispatch(SET_PROFILE(response));
                                Toast.show({
                                  type: "success",
                                  text1: response1.message,
                                });
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
                    : undefined
                }
              />
            </View>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Packages;
