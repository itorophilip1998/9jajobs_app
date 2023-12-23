import { View, Text, Modal, AppState, AppStateStatus } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { Button } from "../../components";

const YoutubeVideos = ({
  visible,
  close,
  item,
}: {
  visible: boolean;
  close: () => void;
  item: any;
}) => {
  const webViewRef = React.useRef<WebView | null>(null);

  React.useEffect(() => {
    // Add event listeners for the YouTube iframe API
    // const handleMessage = (event: any) => {
    //   const data = JSON.parse(event.nativeEvent.data);
    //   if (data && data.event === "onStateChange" && data.info === 0) {
    //     // Video ended, perform cleanup or any other necessary actions
    //     close();
    //     webViewRef.current = null;
    //     console.log("Video ended");
    //   }
    // };

    // Attach event listener to the WebView
    webViewRef.current?.injectJavaScript(`
      if (window.postMessage) {
        window.onStateChange = function(event) {
          window.postMessage(JSON.stringify({ event: 'onStateChange', info: event.data }));
        };
      }
    `);

    // Clean up event listeners when the component unmounts
    return () => {
      webViewRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        // App is in the background, pause the video
        if (nextAppState === "background") {
          // App is in the background, pause or stop the video
          webViewRef.current?.injectJavaScript(`
          if (window.postMessage) {
            window.postMessage(JSON.stringify({ event: 'pauseVideo' }));
          }
        `);
        }
      }
    };

    // Subscribe to app state changes
    const { remove } = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Clean up the subscription when the component unmounts
    return () => {
      remove();
      webViewRef.current = null;
    };
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={close}
      animationType="slide"
    >
      <SafeAreaView className="flex-1 w-full h-full bg-[#000000f1]">
        <WebView
          ref={webViewRef}
          javaScriptEnabled
          onMessage={(event: any) => {
            const data = JSON.parse(event.nativeEvent.data);
            if (data && data.event === "onStateChange" && data.info === 0) {
              // Video ended, perform cleanup or any other necessary actions
              close();
              webViewRef.current = null;
              console.log("Video ended");
            }
          }}
          source={{
            html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${item?.youtube_video_id}?playsinline=1" frameborder="0" allowfullscreen></iframe>`,
          }}
        />
        <Button
          text="Close Video"
          buttonStyleClassName="rounded-none"
          buttonStyle={{width: "100%"}}
          onPress={() => {
            close();
            webViewRef.current = null;
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default YoutubeVideos;
