import { View, Text, Button, Image } from "react-native";
import React from "react";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import userImg from "../../assets/images/user.jpg";
import * as VideoThumbnails from "expo-video-thumbnails";
import { COLORS } from "../utility/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shadowBox, shadowBoxDark } from "../style/Typography";

const VideoCard = ({
  item,
  openYoutube,
}: {
  item: any;
  openYoutube: (e: any) => void;
}) => {
  console.log(item);
  const video = React.useRef<Video | null>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);
  const { darkMode } = useSelector((state: RootState) => state.auth);

  return (
    <View
      style={shadowBox}
      className="w-[150px] h-[100px] my-2 bg-white rounded-md"
    >
      {item.video_url.includes("youtube.com") ? (
        <View className="w-full h-full bg-white rounded-md" />
      ) : (
        <Video
          ref={video}
          style={{ width: "100%", height: "100%" }}
          source={{
            uri:
              item.video_url ||
              "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          onFullscreenUpdate={(event) => {
            if (event.fullscreenUpdate <= 1) {
              video.current?.playAsync();
            } else {
              video.current?.stopAsync();
            }
          }}
          isLooping={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}
      {item.video_url.includes("youtube.com") ? (
        <View className="absolute w-full h-full top-0 left-0 justify-center items-center">
          <AntDesign
            name="youtube"
            size={60}
            color={COLORS.danger}
            onPress={() => openYoutube(item)}
          />
        </View>
      ) : (
        <View className="absolute w-full h-full top-0 left-0 justify-center items-center bg-[#00000081]">
          <FontAwesome5
            name="play-circle"
            size={29}
            color={COLORS.danger}
            onPress={() => {
              video.current
                ?._setFullscreen(true)
                .then((res) =>
                  res.isLoaded
                    ? video.current?.playAsync()
                    : video.current?.pauseAsync()
                );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default VideoCard;
