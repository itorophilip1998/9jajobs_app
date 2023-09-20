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
import { Image } from "react-native";

interface IProps {
  message: string;
  fire: () => void;
}

const SuccessModalContent: React.FC<IProps> = ({ message, fire }) => {
  return (
    <ModalContent>
      <Image
        source={tick}
        style={{ width: W("70%"), height: H("30%") }}
        resizeMode="contain"
      />
      <Spacer axis="vertical" value={10} />
      <Title>Successful</Title>
      <Spacer axis="vertical" value={20} />
      <SmallText>{message}</SmallText>
      <Spacer axis="vertical" value={30} />
      <Padding horizontal={20}>
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

export default SuccessModalContent;
