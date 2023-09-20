import React from "react";
import ModalContent from "./modalContent";
import Spacer from "./spacer";
import Padding from "./padding";
import Button from "./button";
import Title from "./title";
import SmallText from "./smallText";
import Cancel from "../../assets/icons/cancel.svg";
import cancel from "../../assets/icons/cancel.jpg";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { Image } from "react-native";

interface IProps {
  message: string;
  fire: () => void;
}

const ErrorModalContent: React.FC<IProps> = ({ message, fire }) => {
  return (
    <ModalContent>
      <Image source={cancel} style={{width: W("70%"), height: H("30%")}} resizeMode="contain"/>
      <Spacer axis="vertical" value={10} />
      <Title>Error</Title>
      <Spacer axis="vertical" value={20} />
      <SmallText>{message}</SmallText>
      <Spacer axis="vertical" value={30} />
      <Padding horizontal={0}>
        <Button
          text="Ok"
          buttonStyle={{ width: W("75%") }}
          onPress={() => {
            fire();
          }}
        />
      </Padding>
    </ModalContent>
  );
};

export default ErrorModalContent;
