import {
  View,
  Text,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

const ShowImage = ({
  visible,
  close,
  img,
}: {
  visible: boolean;
  close: () => void;
  img: string;
}) => {
  const [scale, setScale] = React.useState(1);
  const [pan, setPan] = React.useState<{ panX: number; panY: number }>({
    panX: 0,
    panY: 0,
  });

  const handleZoom = (event: any) => {
    setScale(event.nativeEvent.scale);
    // console.log(event.nativeEvent);
  };

  const handleZoomEnd = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.scale <= 1) setScale(1);
      else setScale(event.nativeEvent.scale);
    }
  };

  const onPanGestureEvent = (event: any) => {
    setPan({
      panX: event.nativeEvent.translationX,
      panY: 0,
    });
  };

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      setPan({ ...pan, panX: 0 });
    }
  };

  const handleModalPress = () => {
    // Close the modal when tapping on the dark space
    close();
    setScale(1);
    setPan({
      panX: 0,
      panY: 0,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={handleModalPress}
      animationType="slide"
    >
      <SafeAreaView className="flex-1 w-full h-full bg-[#000000f1]">
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <View className="flex-1 justify-center items-center">
            <PinchGestureHandler
              onGestureEvent={handleZoom}
              onHandlerStateChange={handleZoomEnd}
            >
              {/* <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanHandlerStateChange}
              > */}
              <Animated.Image
                source={{ uri: img }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                  transform: [
                    { scale },
                    // { translateX: pan.panX },
                    // { translateY: pan.panY },
                  ],
                }}
              />
              {/* </PanGestureHandler> */}
            </PinchGestureHandler>
          </View>
        </TouchableWithoutFeedback>
        <View className="absolute top-10 right-3">
          <AntDesign
            name="closecircle"
            size={24}
            color={COLORS.danger}
            onPress={handleModalPress}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ShowImage;
