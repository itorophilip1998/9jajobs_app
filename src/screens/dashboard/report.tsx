import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TitleWithButton from "../../components/titleWithButton";

import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { width, height } from "../../utility/constant";
import { Button, InputField, SmallText, Spacer } from "../../components";

const Report = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [report, setReport] = React.useState<string>("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-3"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <ScrollView className="flex-1">
          <TitleWithButton title="Report" fire={() => navigation.goBack()} />
          <Spacer axis="vertical" value={H("2%")} />
          <SmallText className="text-[#696969] text-center p-0 text-[17px] pr-2 font-RedHatDisplaySemiBold">
            Report any issue or concern to 9jajob, type your report below
          </SmallText>
          <Spacer axis="vertical" value={H("3%")} />
          <InputField
            defaultValue={report}
            onTextChange={(value) => setReport(value)}
            type={"default"}
            autoCapitalize={"sentences"}
            className="border border-[#696969]"
            multiline={true}
            numberOfLines={7}
            placeholder="Enter your report"
          />
          <Spacer axis="vertical" value={H("3%")} />
          <Button text="Submit Report" />
          <Spacer axis="vertical" value={H("3%")} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Report;
