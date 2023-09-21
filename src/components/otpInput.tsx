import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import React from "react";
import { FONTS } from "../utility/fonts";

const OtpInput = ({
  value: otp,
  setOtp: setOTP,
}: {
  value: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRefs = React.useRef<TextInput[]>([]);

  const handleChangeText = (text: string, index: number) => {
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = text;
      return newOTP.join("");
    });

    if (text !== "") {
      if (index < 6 - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (index > 0) {
        setOTP((prevOTP) => {
          const newOTP = [...prevOTP];
          newOTP[index - 1] = "";
          return newOTP.join("");
        });
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <TextInput
          key={i}
          ref={(ref) => (ref ? (inputRefs.current[i] = ref) : null)}
          style={{
            ...styles.input,
            borderColor: otp[i] ? "#1CBF74" : "#C3B9B9",
          }}
          value={otp[i]}
          onChangeText={(text) => handleChangeText(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="numeric"
          maxLength={1}
        />
      );
    }
    return inputs;
  };

  return <View style={styles.container}>{renderInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: W("13%"),
    height: H("8%"),
    textAlign: "center",
    fontFamily: FONTS.RedHatDisplaySemiBold,
    fontSize: 22,
    marginHorizontal: 5,
    borderRadius: 10
  },
});

export default OtpInput;
