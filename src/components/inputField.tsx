import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  TextStyle,
  Pressable,
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
  containerClassName?: string;
  placeholderTextColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  dropdown?: boolean;
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
  placeholderTextColor,
  multiline = false,
  numberOfLines,
  onFocus,
  onBlur,
  containerClassName,
  dropdown = false,
}) => {
  const [textValue, setValue] = React.useState("");
  const [isPlaceHolder, togglePlaceholder] = React.useState(true);
  const InputRef = React.useRef(null);
  const { darkMode } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <View
        className={`relative w-[100%] items-center flex-row h-[50px] bg-transparent rounded-md ${containerClassName}`}
        style={{ width: W("90%"), height: "auto", ...containerStyle }}
      >
        <TextInput
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          ref={InputRef}
          placeholderTextColor={placeholderTextColor || "#c6c6c6"}
          keyboardType={type || "default"}
          secureTextEntry={secure}
          className={`min-h-[50px] text-black flex-1 py-[10px] px-[10px] text-[15px] font-semibold font-RedHatDisplayRegular rounded-[5px] bg-transparent ${className}`}
          onChangeText={(value) => onTextChange(value)}
          value={defaultValue}
          onFocus={() => {
            onFocus && onFocus();
          }}
          onBlur={() => {
            onBlur && onBlur();
          }}
          style={{ color: darkMode ? "white" : "black", ...style }}
          placeholder={placeholder || ""}
          autoCapitalize={autoCapitalize || "none"}
        />
        {editable == false && (
          <View className="absolute w-full h-full top-0 left-0 bg-transparent"></View>
        )}
        {dropdown == true && (
          <TouchableWithoutFeedback
            onPress={() => onSuffixTap && onSuffixTap()}
          >
            <View className="absolute w-full h-full top-0 left-0 bg-transparent"></View>
          </TouchableWithoutFeedback>
        )}
        {suffixIcon && (
          <Pressable
            className={`flex justify-center items-center mr-3 ${suffixStyle}`}
            onPress={() => onSuffixTap && onSuffixTap()}
          >
            {suffixIcon}
          </Pressable>
        )}
      </View>
    </>
  );
};

export default InputField;
