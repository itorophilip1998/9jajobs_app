import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { InputField, PrimaryText, SmallText, Spacer } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { SET_SEARCH } from "../../store/searchSlice";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { MESSAGES } from "../../data/messages";
import UserProfileCard from "../../components/userProfileCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { getFriendList } from "../../api/message";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import userImg from "../../../assets/images/user.jpg";
import moment from "moment";

const MessageSection = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [status, setStatus] = React.useState<"all" | "unread" | "spam">("all");
  const [search, setSearch] = React.useState<string>("");
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [messagesList, setMessagesList] = React.useState<any[]>([]);

  const getMessages = () => {
    dispatch(SET_LOADER(true));
    getFriendList(
      (response) => {
        console.log(response.chatted_users);
        dispatch(SET_LOADER(false));
        setMessagesList(response.chatted_users);
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: error,
        });
        dispatch(SET_LOADER(false));
      }
    );
  };

  React.useEffect(() => {
    if (focus) {
      getMessages();
    }
  }, [focus]);
  return (
    <View className="flex-1">
      <View
        style={{ backgroundColor: darkMode ? "#1b1b1b" : "white" }}
        className="w-[93%] mx-auto px-3 py-2 border bg-[#1b1b1b] border-primary rounded-full flex-row justify-between items-center"
      >
        <AntDesign
          name="search1"
          size={20}
          color={darkMode ? "#D4E1D2" : "#696969"}
        />
        <TextInput
          keyboardType={"web-search"}
          className={`h-full w-[90%] text-[15px] text-[#D4E1D2] font-semibold font-RedHatDisplayRegular bg-transparent`}
          onChangeText={(value) => setSearch(value)}
          value={search}
          // onFocus={() => {
          //   onFocus && onFocus();
          // }}
          // onBlur={() => {
          //   onBlur && onBlur();
          // }}
          placeholderTextColor={"#626262"}
          placeholder={"Search here..."}
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
          autoCapitalize={"none"}
        />
      </View>
      <View className="flex-row justify-between items-center w-[70%] mx-auto my-3 px-3">
        <PrimaryText
          onPress={() => setStatus("all")}
          style={{ color: status === "all" ? "#1A911B" : "#696969" }}
          className="mx-2"
        >
          All
        </PrimaryText>
        <View>
          <PrimaryText
            onPress={() => setStatus("unread")}
            style={{ color: status === "unread" ? "#1A911B" : "#696969" }}
            className="mx-2"
          >
            Unread
          </PrimaryText>
        </View>
        <PrimaryText
          onPress={() => setStatus("spam")}
          style={{ color: status === "spam" ? "#1A911B" : "#696969" }}
          className="mx-2"
        >
          Spam
        </PrimaryText>
      </View>
      <FlatList
        className="flex-1"
        onRefresh={getMessages}
        refreshing={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <>
            <View
              className="flex-1 w-full h-full justify-center items-center"
              style={{ height: H("71%") }}
            >
              <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                Nothing Yet
              </GradientText>
            </View>
          </>
        }
        data={messagesList
          .filter((obj) => {
            if (status === "all") {
              return obj?.spam === null || obj?.spam === "unspam";
            } else if (status === "unread") {
              return (
                obj.chats.status === "unread" &&
                (obj?.spam === null || obj?.spam === "unspam")
              );
            } else if (status === "spam") {
              return obj?.spam === "spam";
            }
            return false;
          })
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <Spacer value={H("1%")} axis="vertical" />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { data: item })}
            style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
            className="bg-[#0F0F0F] py-2 px-3 flex-row justify-between"
          >
            <View className="w-[50%] flex-row items-center">
              <Image
                source={
                  item?.photo
                    ? {
                        uri: item?.photo,
                      }
                    : userImg
                }
                alt=""
                className="w-[60px] h-[60px] rounded-full mr-3"
              />
              <View className="h-[60px] justify-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-[#D4E1D2] text-left p-0 text-[18px] mb-1"
                >
                  {item.name}
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                  className="text-left p-0 text-[14px] text-[#696969]"
                >
                  {item?.chats?.message || "Photo"}
                </SmallText>
              </View>
            </View>
            <View className="h-[60px] justify-center items-end">
              <SmallText className="text-right p-0 text-[14px] text-[#696969] mb-2">
                {moment(item?.chats?.created_at).format("DD/MM/YYYY") || ""}
              </SmallText>
              {item?.read === "unread" && (
                <GradientText className="text-primary font-RedHatDisplayRegular text-right p-0 text-[14px]">
                  New
                </GradientText>
              )}
              {/* {!item.read && (
                <SmallText className="text-red-500 font-RedHatDisplayRegular text-right p-0 text-[14px]">
                  New
                </SmallText>
              )} */}

              {/* <View className="w-[10px] h-[10px] rounded-full bg-primary"/> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessageSection;
