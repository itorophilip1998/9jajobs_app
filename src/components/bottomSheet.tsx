import { View, Text } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = React.forwardRef(
  (
    props: {
      height?: number;
      duration: number;
      children: React.ReactNode | React.ReactNode[];
    },
    ref: React.ForwardedRef<RBSheet>
  ) => {
    return (
      <RBSheet
        ref={ref}
        height={props.height || 700}
        openDuration={3000}
        customStyles={{
          container: {
            flex: 1,
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        {props.children}
      </RBSheet>
    );
  }
);

export default BottomSheet;
