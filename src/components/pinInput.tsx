import { View, Text, NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, StyleSheet } from 'react-native'
import React from 'react'
import { FONTS } from '../utility/fonts';
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const PinInput = ({
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
      if (index < 4 - 1) {
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
    for (let i = 0; i < 4; i++) {
      inputs.push(
        <TextInput
          key={i}
          ref={(ref) => (ref ? (inputRefs.current[i] = ref) : null)}
          style={{
            ...styles.input,
            borderColor: otp[i] ? "#1CBF74" : "#C3B9B9",
          }}
          value={otp[i]}
          secureTextEntry
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

export default PinInput

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: W("14%"),
    height: H("8%"),
    textAlign: "center",
    fontFamily: FONTS.ManropeSemiBold,
    fontSize: 22,
    marginHorizontal: 8,
    borderRadius: 100
  },
});