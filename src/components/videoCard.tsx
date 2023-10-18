import { View, Text, Button } from "react-native";
import React from "react";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../utility/colors";

const VideoCard = () => {
  const video = React.useRef<Video | null>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);

  return (
    <View className="w-[150px] h-[100px] ">
      <Video
        ref={video}
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View className="absolute w-full h-full top-0 left-0 justify-center items-center bg-[#00000081]">
        <FontAwesome5
          name="play-circle"
          size={29}
          color={COLORS.danger}
          onPress={() => {
            video.current?._setFullscreen(true).then((res) => res.isLoaded ? video.current?.pauseAsync()
              : video.current?.playAsync());
              
          }}
        />
      </View>
    </View>
  );
};

export default VideoCard;
