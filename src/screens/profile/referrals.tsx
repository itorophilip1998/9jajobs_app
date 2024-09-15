import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, SmallText, Spacer } from "../../components";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import { shadowBox, shadowBoxDark } from "../../style/Typography";
import { COLORS } from "../../utility/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Toast from "react-native-toast-message";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import { getReferral } from "../../api/referral";
import { SET_LOADER } from "../../store/formDataSlice";
import { GradientText } from "../../components/gradientText";
import { SafeAreaView } from "react-native-safe-area-context";

const Referrals = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const [referral, setReferral] = React.useState<any>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getReferral(
        (response) => {
          setLoaded(true);
          dispatch(SET_LOADER(false));
          console.log(response?.referral);
          setReferral(response?.referral);
        },
        (error) => {
          setLoaded(true);
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
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="Referrals" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View className="w-full px-3">
          <SmallText className="text-[#696969] text-center text-[20px] p-0">
            Your Referral history
          </SmallText>
          <Spacer value={H("3%")} axis="vertical" />
          <View
            style={[
              darkMode ? shadowBox : shadowBoxDark,
              { backgroundColor: darkMode ? "black" : "#FFFFFF" },
            ]}
            className="items-center w-full px-5 py-4 bg-black rounded-2xl"
          >
            <View className="w-auto flex-row justify-between items-center mb-2">
              <View>
                <SmallText className="text-primary text-center text-[20px] p-0 mb-1">
                  ₦{referral?.total_earn?.toLocaleString()}
                </SmallText>
                <SmallText className="text-[#696969] text-center text-[15px] p-0">
                  Total Earned
                </SmallText>
              </View>
              <View className="mx-5">
                <SmallText className="text-primary text-center text-[20px] p-0 mb-1">
                  {referral?.completed?.toLocaleString()}
                </SmallText>
                <SmallText className="text-[#696969] text-center text-[15px] p-0">
                  Completed
                </SmallText>
              </View>
              <View>
                <SmallText className="text-primary text-center text-[20px] p-0 mb-1">
                  {referral?.pending?.toLocaleString()}
                </SmallText>
                <SmallText className="text-[#696969] text-center text-[15px] p-0">
                  Pending
                </SmallText>
              </View>
            </View>
            <View className="mx-auto flex-row items-center mt-2">
              <SmallText className="text-[#696969] text-center text-[18px] p-0 mr-2">
                Code:{" "}
                <SmallText
                  style={{ color: darkMode ? "#FFFFFF" : COLORS.primary }}
                  className="text-[#FFFFFF] text-center text-[18px] p-0"
                >
                  {profile?.ref_code}
                </SmallText>
              </SmallText>
              <Ionicons
                name="copy-outline"
                size={24}
                color={COLORS.primary}
                onPress={async () => {
                  if (profile?.ref_code) {
                    const set = await Clipboard.setStringAsync(
                      profile?.ref_code
                    );
                    if (set) {
                      Toast.show({
                        type: "success",
                        text1: "Copied to Clipboard",
                      });
                    }
                  }
                }}
              />
            </View>
          </View>
          <Spacer value={H("4%")} axis="vertical" />
        </View>
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="flex-1 w-full py-3 bg-black"
        >
          <FlatList
            ListHeaderComponent={
              <View className="w-full flex-row justify-between items-center mb-4">
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-[#696969] text-left p-0 text-[20px]"
                >
                  Total Referrals
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-[#696969] font-RedHatDisplayBold text-left p-0 text-[20px]"
                >
                  {referral?.referrals_list?.length}
                </SmallText>
              </View>
            }
            className="px-3 mt-3"
            showsVerticalScrollIndicator={false}
            data={referral?.referrals_list}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Spacer value={H("3%")} axis="vertical" />
            )}
            ListEmptyComponent={
              loaded ? (
                <>
                  <View
                    className="flex-1 w-full h-full justify-center items-center"
                    style={{ height: H("50%") }}
                  >
                    <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                      Oops! No Referral Found
                    </GradientText>
                    <Spacer value={H("2%")} axis="vertical" />
                    <Button
                      text="Go to Menu"
                      onPress={() => {
                        navigation.navigate("Profile");
                      }}
                      buttonStyleClassName="rounded-md"
                    />
                  </View>
                </>
              ) : null
            }
            renderItem={({ item }) => (
              <Pressable className="w-full">
                <View className="flex-row justify-between items-center w-full mb-1">
                  <SmallText
                    style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
                    className="text-[#BDB7C5] text-left p-0 text-[18px]"
                  >
                    {item?.user?.name}
                  </SmallText>
                  <SmallText
                    style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
                    className="text-[#BDB7C5] text-right p-0 text-[18px]"
                  >
                    ₦{item?.amount_earn?.toLocaleString()}
                  </SmallText>
                </View>
                <View className="flex-row justify-between items-center w-full">
                  <SmallText className="text-primary text-left p-0 text-[15px]">
                    {item.user.ref_code}
                  </SmallText>
                  <SmallText className="text-[#6A6A6A] text-right p-0 text-[15px]">
                    {moment(item.created_at).format("DD/MM/YYYY")}
                  </SmallText>
                </View>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Referrals;
