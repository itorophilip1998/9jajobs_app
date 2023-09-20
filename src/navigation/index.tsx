import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ErrorModalContent,
  Loader,
  Modal,
  SuccessModalContent,
} from "../components";
import { SET_ERROR, UNSET_ERROR, UNSET_SUCCESS } from "../store/formDataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Welcome from "../screens/onbodyScreen/welcome";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

const NavigationSetup = () => {
  //   const LoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  //   const authToken = useSelector(
  //     (state: RootState) => state.auth.authData?.token
  //   );
  //   const dispatch = useDispatch();
  //   const OnBoarded = useSelector((state: RootState) => state.auth.onBoarded);

  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState<
    boolean | Notifications.Notification
  >(false);
  const notificationListener = React.useRef<Notifications.Subscription>();
  const responseListener = React.useRef<Notifications.Subscription>();

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: "Here is the notification body",
  //     },
  //     trigger: null,
  //   });
  // }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
  }

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token || "")
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  //   React.useEffect(() => {
  //     if (LoggedIn && authToken && expoPushToken.length > 0) {
  //       sendExpoToken(
  //         authToken,
  //         expoPushToken,
  //         (response) => {
  //           console.log(response);
  //         },
  //         (error) => {
  //           dispatch(SET_ERROR(error));
  //         }
  //       );
  //     }
  //   }, [LoggedIn, authToken, expoPushToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          animation: "slide_from_right",
        })}
      >
        <Stack.Group>
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  const {
    loader,
    successModal: success,
    errorModal: error,
    errorMessage,
    successMessage,
  } = useSelector((state: RootState) => state.formData);
  const dispatch = useDispatch();
  return (
    <>
      <NavigationSetup />
      <Modal showModal={loader}>
        <Loader />
      </Modal>
      <Modal showModal={error || success}>
        {error && (
          <ErrorModalContent
            message={errorMessage}
            fire={() => dispatch(UNSET_ERROR())}
          />
        )}
        {success && (
          <SuccessModalContent
            message={successMessage}
            fire={() => dispatch(UNSET_SUCCESS())}
          />
        )}
      </Modal>
    </>
  );
};

export default AppNavigator;
