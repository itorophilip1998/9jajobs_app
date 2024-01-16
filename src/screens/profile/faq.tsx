import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import TitleWithButton from "../../components/titleWithButton";
import { RootState } from "../../store";
import { width, height } from "../../utility/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, SmallText, Spacer, Title } from "../../components";
import Accordion from "../../components/accordion";

const Faq = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.auth);

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
      <SafeAreaView className="flex-1 w-full h-full">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 mb-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="FAQ" fire={() => navigation.goBack()} />
        </View>
        <FlatList
          className="px-3"
          showsVerticalScrollIndicator={false}
          data={data?.faq}
          keyExtractor={(item, idx) => idx.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("2%")} axis="vertical" />
          )}
          //   ListEmptyComponent={
          //     loaded ? (
          //       <>
          //         <View
          //           className="flex-1 w-full h-full justify-center items-center"
          //           style={{ height: H("50%") }}
          //         >
          //           <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
          //             Oops! No Transaction Found
          //           </GradientText>
          //           <Spacer value={H("2%")} axis="vertical" />
          //           <Button
          //             text="Fund Wallet"
          //             onPress={() => {
          //               setAmount("");
          //               fundRef.current?.open();
          //             }}
          //             buttonStyleClassName="rounded-md"
          //           />
          //         </View>
          //       </>
          //     ) : null
          //   }
          //   ListFooterComponent={<Spacer value={H("3%")} axis="vertical" />}
          renderItem={({ item }) => (
            <Accordion body={item.body} title={item.title} />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Faq;
