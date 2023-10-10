import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  TextStyle,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  className?: string;
  placeholder?: string;
  onTextChange: (value: string) => void;
  defaultValue: string;
  type:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "visible-password"
    | "web-search";
  editable?: boolean;
  suffixIcon?: JSX.Element;
  onSuffixTap?: () => void;
  suffixStyle?: string;
  secure?: boolean;
  autoCapitalize: "none" | "sentences" | "words" | "characters";
  style?: TextStyle;
  containerStyle?: TextStyle;
  placeholderTextColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputField: React.FC<IProps> = ({
  className,
  placeholder,
  onTextChange,
  defaultValue,
  type,
  editable = true,
  containerStyle,
  suffixIcon,
  onSuffixTap,
  suffixStyle,
  secure,
  style,
  autoCapitalize,
  placeholderTextColor = "#626262",
  multiline = false,
  numberOfLines,
  onFocus,
  onBlur,
}) => {
  const [textValue, setValue] = React.useState("");
  const [isPlaceHolder, togglePlaceholder] = React.useState(true);
  const InputRef = React.useRef(null);
  const {darkMode} = useSelector((state: RootState) => state.auth)

  return (
    <>
      <View
        className="relative w-[100%] flex h-full"
        style={{ width: W("90%"), height: "auto", ...containerStyle }}
      >
        <TextInput
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          ref={InputRef}
          placeholderTextColor={placeholderTextColor}
          keyboardType={type || "default"}
          secureTextEntry={secure}
          className={`min-h-[50px] w-[100%] py-[10px] px-[16px] text-[15px] text-white font-semibold font-RedHatDisplayRegular rounded-[5px] bg-transparent ${className}`}
          onChangeText={(value) => onTextChange(value)}
          value={defaultValue}
          onFocus={() => {
            onFocus && onFocus();
          }}
          onBlur={() => {
            onBlur && onBlur();
          }}
          style={{color: darkMode ? "white" : "black", ...style}}
          placeholder={placeholder || ""}
          autoCapitalize={autoCapitalize || "none"}
        />
        {editable == false && (
          <View className="absolute w-full h-full top-0 left-0 bg-transparent"></View>
        )}
        {suffixIcon && (
          <TouchableWithoutFeedback
            onPress={() => onSuffixTap && onSuffixTap()}
          >
            <View
              className={`flex justify-center items-center px-[16px] h-full w-[50px] absolute right-0 ${suffixStyle}`}
            >
              {suffixIcon}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};

export default InputField;
