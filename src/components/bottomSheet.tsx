import { View, Text } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import { FONTS } from "../utility/fonts";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const BottomSheet = React.forwardRef(
  (
    props: {
      height?: number;
      duration: number;
      children: React.ReactNode | React.ReactNode[];
    },
    ref: React.ForwardedRef<RBSheet>
  ) => {
    const { darkMode } = useSelector((state: RootState) => state.auth);
    const toastConfig: ToastConfig = {
      success: (props) => (
        <BaseToast
          {...props}
          style={{
            borderLeftColor: "#4BAF4F",
            backgroundColor: darkMode ? "#161B22" : "#F0F0F0",
          }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: "400",
            fontFamily: FONTS.RedHatDisplayRegular,
            color: darkMode ? "white" : "black",
          }}
          text2Style={{ fontSize: 12, fontFamily: FONTS.RedHatDisplayRegular }}
        />
      ),
      error: (props) => (
        <ErrorToast
          {...props}
          style={{
            borderLeftColor: "red",
            backgroundColor: darkMode ? "#161B22" : "#F0F0F0",
          }}
          text1Style={{
            fontSize: 15,
            fontWeight: "400",
            color: darkMode ? "white" : "black",
            fontFamily: FONTS.RedHatDisplayRegular,
          }}
          text2Style={{
            fontSize: 12,
            fontFamily: FONTS.RedHatDisplayRegular,
          }}
        />
      ),
    };
    return (
      <RBSheet
        ref={ref}
        height={props.height || 400}
        openDuration={3000}
        animationType="slide"
        // keyboardAvoidingViewEnabled={false}
        customStyles={{
          container: {
            width: "100%",
            height: props.height || 400,
            backgroundColor: "red",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        {props.children}
        <Toast config={toastConfig} />
      </RBSheet>
    );
  }
);

export default BottomSheet;
