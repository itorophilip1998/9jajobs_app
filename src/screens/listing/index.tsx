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

const Listing = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
//   const sortRef = React.useState<RBSheet | null>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-3"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <TitleWithButton
          title="All Listing"
          fire={() => navigation.goBack()}
        //   right
        //   rightFire={() => {}}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={MAIN_USERS}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("3%")} axis="vertical" />
          )}
          renderItem={({ item }) => (
            <UserProfileCard
              item={{}}
              onPress={() => navigation.navigate("FreelancerProfile")}
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Listing;
