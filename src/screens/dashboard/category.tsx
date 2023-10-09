import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import TitleWithButton from "../../components/titleWithButton";
import { width, height } from "../../utility/constant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CATEGORIES } from "../../data/category";
import CategoryCard from "../../components/categoryCard";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Spacer } from "../../components";

const Category = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black px-3"
      style={{ width: width, height: height }}
    >
      <SafeAreaView className="flex-1 w-full bg-black py-4">
        <TitleWithButton title="Categories" fire={() => navigation.goBack()} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={3}
          ItemSeparatorComponent={() => (
            <Spacer value={H("1%")} axis="vertical" />
          )}
          renderItem={({ item }) => (
            <CategoryCard
              onPress={() => navigation.navigate("Freelancers")}
              key={item.id.toString()}
              item={item}
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Category;
