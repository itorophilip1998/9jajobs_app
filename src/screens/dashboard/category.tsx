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
import CategoryCard from "../../components/categoryCard";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Button, SmallText, Spacer } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp } from "@react-navigation/native";
import { GradientText } from "../../components/gradientText";
import { useDispatch } from "react-redux";
import { SET_TYPE } from "../../store/searchSlice";
import { AntDesign } from "@expo/vector-icons";

const Category = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const { location, search } = useSelector((state: RootState) => state.search);

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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={route.params?.data}
          keyExtractor={(item) => item?.id?.toString()}
          // columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={3}
          ItemSeparatorComponent={() => (
            <Spacer value={H("1%")} axis="vertical" />
          )}
          ListEmptyComponent={
            <>
              <View
                className="flex-1 w-full h-full justify-center items-center"
                style={{ height: H("71%") }}
              >
                <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                  Oops! No Category Found
                </GradientText>
                <Spacer value={H("2%")} axis="vertical" />
                <Button
                  text="Back to Home"
                  onPress={() => navigation.navigate("Dashboard")}
                  buttonStyleClassName="rounded-md"
                  buttonStyle={{ width: "100%" }}
                />
              </View>
            </>
          }
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
