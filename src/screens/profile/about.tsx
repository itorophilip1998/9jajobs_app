import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, SmallText, Spacer, Title } from "../../components";

const About = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
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
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="About" fire={() => navigation.goBack()} />
        </View>
        <ScrollView className="w-full flex-1">
          <SmallText
            style={{ color: darkMode ? "#fff" : "#0f0f0f0" }}
            className="text-[#696969] text-left text-xl mb-3"
          >
            Shaping the Future of Business
          </SmallText>
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
            className="text-[#696969] text-left text-lg mb-3"
          >
            {`9JAJOB.COM INT’L SERVICES registered with Nigerian Corporate Affairs Commission is your number one source for all things. We're dedicated to giving you the very best of business/services information within and outside your environs in Nigeria.
We are committed to nurturing a neutral platform and helping business establishments maintain high standards by connecting business and service providers to their prospective clients and customers.
9JAJOB has come a long way from its beginnings. When first started out, our passion for business growth drove us that we now serve customers all over Nigeria and beyond. We are thrilled that we're able to turn our passion into our own platform .
We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.`}
          </SmallText>
          <View className="mb-3 flex-row items-center pr-3">
            <SmallText
              style={{ color: darkMode ? "#fff" : "#0f0f0f0" }}
              className="text-[#696969] text-left text-xl"
            >
              Our Values
            </SmallText>
            <View className="border-[0.5px] border-[#696969] flex-1" />
          </View>
          <SmallText
            style={{ color: darkMode ? "#696969" : "#0f0f0f0" }}
            className="text-[#696969] text-left text-lg mb-3"
          >
            {`Resilience
We push ourselves beyond our abilities when faced with tough times. When we foresee uncertainty, we address it only with flexibility.
Acceptance
Feedback is never taken personally, we break it into positive pieces and strive to work on each and every element even more effectively.
Humility
It’s always ‘us’ over ‘me’. We don’t lose ourselves in pride or confidence during individual successes but focus on being our simple selves in every which way.
Spark
We believe in, stand for, and are evangelists of our culture - both, within Nigeria and externally with all our stakeholders.
Judgement
It’s not our abilities that show who we truly are - it’s our choices. We aim to get these rights, at least in the majority of the cases.
Vision
It is our top priority to raise the standard of business services in Nigeria and it is our vision to make all business/service accessibility very easy and simple. With this we urge all to assist us in this journey of making our world a better place.`}
          </SmallText>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default About;
