import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Linking,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { InputField, SmallText, Spacer, Title } from "../../components";
import { COLORS } from "../../utility/colors";
import { FreelancerChat, UserChat } from "../../components/chatCards";
import userImg from "../../../assets/images/user.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SET_LOADER, SET_NOTIFICATION } from "../../store/formDataSlice";
import { chatUser, getChats, markRead, spamUser } from "../../api/message";
import Toast from "react-native-toast-message";
import SendPhotoSheet from "../modals/sendPhotoSheet";
import { DropdownMenu } from "../../components/dropdownModal";
import { getNotificationCount } from "../../api/notification";

const Chat = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState<string>("");
  const { darkMode, profile, loggedIn, access_token } = useSelector(
    (state: RootState) => state.auth
  );
  const [chats, setChats] = React.useState<any>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [visible1, setVisible1] = React.useState<boolean>(false);
  const [selectedImages, setSelectedImages] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (focus) {
      if (!Boolean(loggedIn && access_token)) {
        navigation.navigate("Signin", { two_step: true });
      } else {
        dispatch(SET_LOADER(true));
        markRead(
          { friend_id: route.params?.data?.id },
          (response1) => {
            getNotificationCount(
              (response) => {
                dispatch(SET_NOTIFICATION(response));
                getChats(
                  { friend_id: route.params?.data?.id },
                  (response) => {
                    console.log(response);
                    setChats(response);
                    dispatch(SET_LOADER(false));
                  },
                  (error) => {
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                    dispatch(SET_LOADER(false));
                  }
                );
              },
              (error) => {
                Toast.show({
                  type: "error",
                  text1: error,
                });
                dispatch(SET_LOADER(false));
              }
            );
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
    }
  }, [focus, loggedIn, access_token]);

  const sendMessage = () => {
    setVisible(false);
    dispatch(SET_LOADER(true));
    chatUser(
      {
        friend_id: route.params?.data?.id,
        message: message.trim() === "" ? "Photo" : message,
        photo: selectedImages.map((item) => ({
          name: item.fileName,
          uri: item.uri,
          type: "image/png",
        })),
      },
      (response1) => {
        setMessage("");
        markRead(
          { friend_id: route.params?.data?.id },
          (response2) => {
            dispatch(SET_NOTIFICATION({ messages: 0 }));
            getChats(
              { friend_id: route.params?.data?.id },
              (response) => {
                dispatch(SET_LOADER(false));
                setChats(response);
                setMessage("");
              },
              (error) => {
                Toast.show({
                  type: "error",
                  text1: error,
                });
                dispatch(SET_LOADER(false));
              }
            );
          },
          (error) => {
            Toast.show({
              type: "error",
              text1: error,
            });
            dispatch(SET_LOADER(false));
          }
        );
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
  // console.log(
  //   chats?.chats?.find((item: any) => {
  //     console.log("chat", item);
  //     return item !== undefined;
  //   })
  // );
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true, // Enable multiple selection
      });

      if (!result.canceled) {
        setSelectedImages(result.assets);
        setVisible(true);
      }
    } else {
      Alert.alert(
        "Error",
        "This application does not have access. Please enable it from your settings.",
        [{ text: "Ok" }]
      );
    }
  };

  // console.log(route.params?.data?.photo);
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
      <View
        className="flex-1 w-full "
        style={{
          backgroundColor: darkMode ? "#0f0f0f" : "white",
          paddingTop: height * 0.05,
          paddingBottom: height * 0.007,
        }}
      >
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
                source={
                  route.params?.data?.photo
                    ? {
                        uri: route.params?.data?.photo,
                      }
                    : userImg
                }
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-3"
              />
              <View className="h-[60px] justify-center">
                <SmallText
                  style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                  className="text-[#D4E1D2] text-left p-0 text-[20px]"
                >
                  {route.params?.data?.name}
                </SmallText>
                {/* <SmallText className="text-left p-0 text-[14px] text-[#696969]">
                  Online
                </SmallText> */}
              </View>
            </View>
          </View>
          <View className="flex-row items-center">
            {route.params?.data?.phone && (
              <Pressable
                onPress={() =>
                  Linking.openURL(`tel:${route.params?.data?.phone}`)
                }
                className="mr-3"
              >
                <Ionicons name="ios-call" size={24} color={COLORS.primary} />
              </Pressable>
            )}
            {chats?.chats?.length > 0 && (
              <Entypo
                name="dots-three-vertical"
                size={24}
                color={COLORS.primary}
                onPress={() => setVisible1(true)}
              />
            )}
          </View>
        </View>
        {/* SCROLLVIEW */}
        <FlatList
          className="px-3 py-4"
          style={{
            backgroundColor: darkMode ? "black" : "#D4E1D2",
          }}
          showsVerticalScrollIndicator={false}
          data={chats?.chats}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("3%")} axis="vertical" />
          )}
          ListFooterComponent={<Spacer value={H("5%")} axis="vertical" />}
          renderItem={({ item }) =>
            item.user_id === profile?.id ? (
              <UserChat data={item} />
            ) : (
              <FreelancerChat data={item} />
            )
          }
        />
        {(chats?.chats?.length === 0 ||
          chats?.chats?.some((item: any) => {
            return item?.spam === null || item?.spam === "unspam";
          })) && (
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
              containerStyle={{ width: "80%" }}
              className="border-[#626262] focus:border-primary border rounded-full p-0 px-3 w-full"
            />
            <Pressable onPress={pickImages}>
              <Feather name="paperclip" size={24} color={COLORS.primary} />
            </Pressable>
            <Pressable onPress={() => message.trim() !== "" && sendMessage()}>
              <FontAwesome name="send" size={24} color={COLORS.primary} />
            </Pressable>
          </View>
        )}
      </View>
      <SendPhotoSheet
        setImages={setSelectedImages}
        setMessage={setMessage}
        setVisible={setVisible}
        message={message}
        visible={visible}
        images={selectedImages}
        sendMessage={sendMessage}
      />
      <DropdownMenu
        isVisible={visible1}
        onClose={() => setVisible1(false)}
        onSelectOption={(value: string) => {
          if (value === "Spam") {
            dispatch(SET_LOADER(true));
            spamUser(
              { friend_id: route.params?.data?.id, status: "spam" },
              (response1) => {
                getChats(
                  { friend_id: route.params?.data?.id },
                  (response) => {
                    console.log(response);
                    dispatch(SET_LOADER(false));
                    setChats(response);
                  },
                  (error) => {
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                    dispatch(SET_LOADER(false));
                  }
                );
              },
              (error) => {
                Toast.show({
                  type: "error",
                  text1: error,
                });
                dispatch(SET_LOADER(false));
              }
            );
          } else {
            dispatch(SET_LOADER(true));
            spamUser(
              { friend_id: route.params?.data?.id, status: "unspam" },
              (response1) => {
                getChats(
                  { friend_id: route.params?.data?.id },
                  (response) => {
                    console.log(response);
                    dispatch(SET_LOADER(false));
                    setChats(response);
                  },
                  (error) => {
                    Toast.show({
                      type: "error",
                      text1: error,
                    });
                    dispatch(SET_LOADER(false));
                  }
                );
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
        }}
        options={[
          chats?.chats?.length === 0 ||
          chats?.chats?.some(
            (item: any) => item?.spam === null || item?.spam === "unspam"
          )
            ? "Spam"
            : "Unspam",
        ]}
        position={{ top: 110, right: 10 }}
      />
    </KeyboardAvoidingView>
  );
};

export default Chat;
