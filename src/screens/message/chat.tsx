import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Linking,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { InputField, SmallText, Spacer, Title } from "../../components";
import { COLORS } from "../../utility/colors";
import { CHAT_MESSAGE } from "../../data/messages";
import { FreelancerChat, UserChat } from "../../components/chatCards";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Chat = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [message, setMessage] = React.useState<string>("");
  const { darkMode } = useSelector((state: RootState) => state.auth);
  //   const sortRef = React.useState<RBSheet | null>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#D4E1D2",
      }}
    >
      <SafeAreaView className="flex-1 w-full">
        <View
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
          className="relative flex flex-row items-center w-full justify-between px-3 py-1 bg-[#0f0f0f]"
        >
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" size={30} color={"#696969"} />
            </Pressable>
            <View className="flex-row items-center ml-3">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
                }}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-3"
              />
              <View className="h-[60px] justify-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-[#D4E1D2] text-left p-0 text-[20px]"
                >
                  Collins Vincent
                </SmallText>
                <SmallText className="text-left p-0 text-[14px] text-[#696969]">
                  Online
                </SmallText>
              </View>
            </View>
          </View>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => Linking.openURL("tel:+2347041528380")}
              className="mr-3"
            >
              <Ionicons name="ios-call" size={24} color={COLORS.primary} />
            </Pressable>
          </View>
        </View>
        {/* SCROLLVIEW */}
        <FlatList
          className="px-3 py-4"
          showsVerticalScrollIndicator={false}
          data={CHAT_MESSAGE}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("3%")} axis="vertical" />
          )}
          ListFooterComponent={<Spacer value={H("5%")} axis="vertical" />}
          renderItem={({ item }) =>
            item.user ? (
              <UserChat message={item.message} />
            ) : (
              <FreelancerChat message={item.message} />
            )
          }
        />
        <View
          style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
          className="flex flex-row items-center w-full justify-between px-3 py-4 bg-[#0f0f0f]"
        >
          <InputField
            onTextChange={(value) => setMessage(value)}
            defaultValue={message}
            placeholder="Write your message here"
            type={"default"}
            autoCapitalize={"none"}
            containerStyle={{ width: "87%" }}
            className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
          />
          <Pressable onPress={() => {}}>
            <FontAwesome name="send" size={24} color={COLORS.primary} />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Chat;
