import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Linking,
  Pressable,
  Alert,
  ActivityIndicator,
  TextInput,
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
import { DelayFor } from "../../utility/helpers";

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
  const scrollRef = React.useRef<FlatList>(null);
  const [chats, setChats] = React.useState<any>(null);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [visible1, setVisible1] = React.useState<boolean>(false);
  const [selectedImages, setSelectedImages] = React.useState<any[]>([]);

  React.useEffect(() => {
    let timer: any;
    if (focus) {
      if (!Boolean(loggedIn && access_token)) {
        navigation.navigate("Signin", { two_step: true });
      } else {
        const getFetchData = (mainLoad?: boolean) => {
          mainLoad && dispatch(SET_LOADER(true));
          getChats(
            { friend_id: route.params?.data?.friend?.id },
            (response) => {
              setChats(response);
              console.log(
                response?.chats[response?.chats?.length - 1]?.chatted_user
              );
              if (
                response?.chats[response?.chats?.length - 1]?.chatted_user
                  ?.status === "unread"
              ) {
                markRead(
                  { friend_id: route.params?.data?.friend?.id },
                  (response1) => {
                    getNotificationCount(
                      (response2) => {
                        dispatch(SET_NOTIFICATION(response2));
                        mainLoad && dispatch(SET_LOADER(false));
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
                getNotificationCount(
                  (response2) => {
                    dispatch(SET_NOTIFICATION(response2));
                    mainLoad && dispatch(SET_LOADER(false));
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

        getFetchData(false);

        timer = setInterval(() => getFetchData(false), 5000);
      }
    }
    return () => clearInterval(timer);
  }, [focus, loggedIn, access_token]);

  const sendMessage = () => {
    setVisible(false);
    setLoader(true);
    chatUser(
      {
        friend_id: route.params?.data?.friend?.id,
        message: message.trim() === "" ? "Photo" : message,
        photo: selectedImages.map((item) => ({
          name:
            item.fileName ||
            "image." + item?.uri?.split(".").pop()?.toLowerCase(),
          uri: item.uri,
          type: "image/" + item?.uri?.split(".").pop()?.toLowerCase(),
        })),
      },
      (response1) => {
        setMessage("");
        dispatch(SET_NOTIFICATION({ messages: 0 }));
        getChats(
          { friend_id: route.params?.data?.friend?.id },
          (response) => {
            setLoader(false);
            setChats(response);
            setMessage("");
          },
          (error) => {
            setLoader(false);
            Toast.show({
              type: "error",
              text1: error,
            });
          }
        );
        // markRead(
        //   { friend_id: route.params?.data?.friend?.id },
        //   (response2) => {

        //   },
        //   (error) => {
        //     setLoader(false);
        //     Toast.show({
        //       type: "error",
        //       text1: error,
        //     });
        //   }
        // );
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: error,
        });
        setLoader(false);
      }
    );
  };

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
                  route.params?.data?.friend?.photo
                    ? {
                        uri: route.params?.data?.friend?.photo,
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
                  {route.params?.data?.friend?.name}
                </SmallText>
                {/* <SmallText className="text-left p-0 text-[14px] text-[#696969]">
                  Online
                </SmallText> */}
              </View>
            </View>
          </View>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => {
                if (route.params?.data?.friend?.phone) {
                  Linking.openURL(
                    `tel:${route.params?.data?.friend?.phone?.replace(
                      /[()[\]{}<>+=.,;:'"_\-!@#$%^&*|\\/?`~\s]/g,
                      ""
                    )}`
                  );
                } else {
                  Toast.show({
                    type: "error",
                    text1: "This user does not have a phone number",
                  });
                }
              }}
              className="mr-3"
            >
              <Ionicons name="ios-call" size={24} color={COLORS.primary} />
            </Pressable>

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
          ref={scrollRef}
          className="px-3 py-4 flex-1"
          style={{
            backgroundColor: darkMode ? "black" : "#D4E1D2",
          }}
          showsVerticalScrollIndicator={false}
          data={chats?.chats}
          keyExtractor={(item) => item.id.toString()}
          // ListEmptyComponent={() => (
          //   <View className="flex-1 justify-center items-center mt-5">
          //     <ActivityIndicator size="large" color={COLORS.primary} />
          //   </View>
          // )}
          ItemSeparatorComponent={() => (
            <Spacer value={H("3%")} axis="vertical" />
          )}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
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
            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Type your message..."
              placeholderTextColor={darkMode ? "#c6c6c6" : "#000"}
              className="border-[#626262] focus:border-primary border rounded-full text-[15px] py-3 px-3 w-[80%]"
              style={{
                color: darkMode ? "white" : "black",
              }}
              multiline
              numberOfLines={1}
              onSubmitEditing={sendMessage}
            />
            <Pressable onPress={pickImages}>
              <Feather name="paperclip" size={24} color={COLORS.primary} />
            </Pressable>
            {loader ? (
              <ActivityIndicator size={"small"} color={COLORS.primary} />
            ) : (
              <Pressable onPress={() => message.trim() !== "" && sendMessage()}>
                <FontAwesome name="send" size={24} color={COLORS.primary} />
              </Pressable>
            )}
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
              { friend_id: route.params?.data?.friend?.id, status: "spam" },
              (response1) => {
                getChats(
                  { friend_id: route.params?.data?.friend?.id },
                  (response) => {
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
              { friend_id: route.params?.data?.friend?.id, status: "unspam" },
              (response1) => {
                getChats(
                  { friend_id: route.params?.data?.friend?.id },
                  (response) => {
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
