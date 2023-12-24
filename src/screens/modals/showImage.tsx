import { View, Text, Modal, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";

const ShowImage = ({
  visible,
  close,
  img,
}: {
  visible: boolean;
  close: () => void;
  img: string;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={close}
      animationType="slide"
    >
      <SafeAreaView className="flex-1 w-full h-full bg-[#000000f1]">
        <Image
          source={{ uri: img }}
          className="w-full h-full"
          resizeMode="contain"
        />
        <View className="absolute top-10 right-3">
          <AntDesign
            name="closecircle"
            size={24}
            color={COLORS.danger}
            onPress={close}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ShowImage;
