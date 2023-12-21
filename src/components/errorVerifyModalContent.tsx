import React from "react";
import ModalContent from "./modalContent";
import Spacer from "./spacer";
import Padding from "./padding";
import Button from "./button";
import Title from "./title";
import SmallText from "./smallText";
import tick from "../../assets/icons/tick.jpg";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Image, View } from "react-native";
import Modal from "./modal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shadowBox } from "../style/Typography";

interface IProps {
  message: { title: string; message: string };
  visible: boolean;
  children: JSX.Element;
  icon: JSX.Element;
}

const ErrorVerifyModalContent: React.FC<IProps> = ({ message, visible, icon, children }) => {
  const {darkMode} = useSelector((state: RootState) => state.auth)
  return (
    <Modal showModal={visible}>
      <View className="flex py-[23px] px-[25px] items-start justify-start">
        <View
          className="p-3 rounded-full bg-[#FEE4E2] mx-auto"
          style={{
            backgroundColor: darkMode ? "#0F0F0F" : "white",
            ...shadowBox,
          }}
        >
          {icon}
        </View>
        <Spacer axis="vertical" value={10} />
        <Title className="text-[#C93636] text-center w-full text-[18px]">{message.title}</Title>
        <Spacer axis="vertical" value={10} />
        <SmallText
          className="p-0 text-center w-full text-[14px]"
          style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
        >
          {message.message}
        </SmallText>
        <Spacer axis="vertical" value={20} />
        <Padding horizontal={0}>{children}</Padding>
      </View>
    </Modal>
  );
};

export default ErrorVerifyModalContent;
