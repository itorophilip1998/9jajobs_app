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
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp } from "@react-navigation/native";

const Category = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
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
        <TitleWithButton title="Categories" fire={() => navigation.goBack()} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={route.params?.data}
          keyExtractor={(item) => item.id.toString()}
          // columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={3}
          ItemSeparatorComponent={() => (
            <Spacer value={H("1%")} axis="vertical" />
          )}
          renderItem={({ item }) => (
            <CategoryCard
              onPress={() => navigation.navigate("Freelancers", { data: item })}
              key={item.id.toString()}
              item={item}
              color={darkMode ? "#0F0F0F" : "white"}
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Category;
