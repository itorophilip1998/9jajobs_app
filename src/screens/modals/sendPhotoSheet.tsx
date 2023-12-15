import {
  View,
  Text,
  Modal,
  ImageBackground,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/inputField";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const SendPhotoSheet = ({
  setMessage,
  setImages,
  setVisible,
  images,
  message,
  visible,
  sendMessage,
}: {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  visible: boolean;
  images: any[];
  sendMessage: () => void;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    if (images.length <= 0) {
      setVisible(false);
    }
  }, [images.length]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <ImageBackground
        source={{ uri: images[index]?.uri }}
        alt=""
        className="flex-1 w-full"
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 w-full bg-[#00000098]"
        >
          <SafeAreaView
            className="w-full flex-1 justify-between px-4 pt-16 pb-7"
            style={{ paddingTop: Platform.OS === "android" ? 20 : 50 }}
          >
            <View className="items-end w-full">
              <Pressable
                onPress={() => setVisible(false)}
                className="w-[28px] h-[28px] justify-center items-center rounded-full bg-red-500"
              >
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </View>
            <View>
              <View className="w-full flex-row flex-wrap justify-center items-center mb-2">
                {images.map((img, idx: number) => (
                  <Pressable
                    onPress={() => setIndex(idx)}
                    className="w-[60px] h-[70px] border-primary border rounded-md mx-3 mb-3"
                  >
                    <Image
                      source={{ uri: img?.uri }}
                      alt=""
                      className="w-full h-full"
                    />
                    <Pressable
                      onPress={() => {
                        setImages(
                          images.filter((item, index) => idx !== index)
                        );
                        if (idx === index && index > 0) {
                          setIndex(index - 1);
                        }
                      }}
                      className="w-[18px] h-[18px] absolute top-[-10px] right-[-10px] justify-center items-center rounded-full bg-red-500"
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={14}
                        color="white"
                      />
                    </Pressable>
                  </Pressable>
                ))}
              </View>
              <InputField
                onTextChange={(value) => setMessage(value)}
                defaultValue={message}
                placeholder="Enter message"
                type={"default"}
                autoCapitalize={"none"}
                containerStyle={{
                  width: "100%",
                  backgroundColor: darkMode ? "#0f0f0f" : "white",
                  borderWidth: 0.5,
                  borderColor: "#8B909A",
                  borderRadius: 10,
                }}
                className=" rounded-md p-0 px-3 w-full"
                suffixIcon={
                  <FontAwesome
                    name="send"
                    size={19}
                    color={COLORS.primary}
                    onPress={sendMessage}
                  />
                }
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Modal>
  );
};

export default SendPhotoSheet;
