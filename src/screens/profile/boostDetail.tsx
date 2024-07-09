import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import { Button, InputField, SmallText, Spacer } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import Checkbox from "expo-checkbox";
import { COLORS } from "../../utility/colors";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { RouteProp } from "@react-navigation/native";
import { subscribeBoosting } from "../../api/packages";

const BoostDetail = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = React.useState<boolean>(false);
  const { boosting_amount: amount, boosting_estimated_users } = useSelector(
    (state: RootState) => state.formData.dynamicForm
  );
  const [duration, setDuration] = React.useState<number>(1);
  const { darkMode } = useSelector((state: RootState) => state.auth);

  const validate = () => {
    if (!isChecked) {
      Toast.show({
        type: "error",
        text1: "Please accept terms and conditions and privacy policy",
      });
    } else {
      dispatch(SET_LOADER(true));
      subscribeBoosting(
        {
          amount: Number(amount) * duration,
          duration: duration,
          listing_id: route.params?.data.id,
        },
        (response) => {
          dispatch(SET_LOADER(false));
          setDuration(1);
          navigation.goBack();
          Toast.show({
            type: "success",
            text1: response?.message,
          });
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
          dispatch(SET_LOADER(false));
        }
      );
    }
  };
  return (
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
            title="Boost Post"
            fire={() => navigation.goBack()}
          />
        </View>
        <ScrollView
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "transparent" }}
          className="flex-1 px-3 bg-black rounded-t-xl py-3"
        >
          <Spacer axis="vertical" value={H(2)} />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Amount
          </SmallText>
          <Spacer axis="vertical" value={H(2)} />
          <InputField
            onTextChange={(value) => {}}
            defaultValue={(Number(amount) * duration).toLocaleString()}
            placeholder="Enter your business name here"
            containerStyle={{ width: "100%" }}
            editable={false}
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
            Duration (Month)
          </SmallText>
          <Spacer axis="vertical" value={H(2)} />
          <InputField
            onTextChange={(value) => {}}
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            defaultValue={duration.toLocaleString() || ""}
            placeholder="Select your business category"
            type={"default"}
            autoCapitalize={"none"}
            containerStyle={{
              width: "100%",
              backgroundColor: darkMode ? "transparent" : "white",
            }}
            className="rounded-full p-0"
            containerClassName="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
            editable={false}
            suffixStyle="w-[60px]"
            suffixIcon={
              <View className="flex-row w-full justify-between items-center">
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="#696969"
                  className="mr-2"
                  onPress={() => setDuration(duration + 1)}
                />
                <AntDesign
                  name="minuscircleo"
                  size={24}
                  color="#696969"
                  onPress={() => duration > 1 && setDuration(duration - 1)}
                />
              </View>
            }
          />
          <Spacer axis="vertical" value={H(2)} />
          <SmallText
            style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
            className="text-[#D4E1D2] text-left p-0"
          >
            Estimated daily result
          </SmallText>
          <Spacer axis="vertical" value={H(2)} />
          <InputField
            onTextChange={(value) => {}}
            style={{ backgroundColor: darkMode ? "transparent" : "white" }}
            defaultValue={Number(boosting_estimated_users).toLocaleString()}
            placeholder="Select your business category"
            type={"default"}
            autoCapitalize={"none"}
            containerStyle={{
              width: "100%",
              backgroundColor: darkMode ? "transparent" : "white",
            }}
            className="rounded-full p-0"
            containerClassName="border-[#626262] focus:border-primary border rounded-full p-0 px-3"
            editable={false}
            suffixIcon={
              <SmallText className="p-0 text-[#696969]">
               Total Users reached
              </SmallText>
            }
          />
          <Spacer axis="vertical" value={H(1)} />
          <SmallText className="text-[15px] !text-[#696969] text-left p-0 ">
            Your ad will be boosted today and run for{" "}
            {duration.toLocaleString()}months ending on{" "}
            {moment(
              new Date(new Date().setMonth(new Date().getMonth() + duration))
            ).format("MMM DD, YYYY")}
          </SmallText>
          <Spacer axis="vertical" value={H(2)} />
          <View className="flex-row items-center">
            <Checkbox
              color={COLORS.primary}
              value={isChecked}
              onValueChange={setChecked}
            />
            <SmallText
              onPress={() => navigation.navigate("Terms")}
              className="text-[15px] !text-[#696969] text-left !pl-3"
            >
              By applying, you agree to our{" "}
              <Text
                className="text-primary underline"
                onPress={() => navigation.navigate("Terms")}
              >
                Terms & Conditions
              </Text>{" "}
              and{" "}
              <Text
                className="text-primary underline"
                onPress={() => navigation.navigate("Privacy")}
              >
                Privacy Policy
              </Text>
            </SmallText>
          </View>
          <Spacer axis="vertical" value={H(2)} />
          <Button
            text="Boost Now"
            buttonStyle={{ width: "100%" }}
            onPress={validate}
          />
          <Spacer axis="vertical" value={H(2)} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BoostDetail;
