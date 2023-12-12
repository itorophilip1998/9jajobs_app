import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ErrorModalContent,
  Loader,
  Modal,
  SuccessModalContent,
} from "../components";
import {
  SET_LOADER,
  SET_NOTIFICATION,
  UNSET_ERROR,
  UNSET_SUCCESS,
} from "../store/formDataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import * as Notifications from "expo-notifications";
import { Platform, View } from "react-native";
import Welcome from "../screens/onbodyScreen/welcome";
import Body from "../screens/onbodyScreen/body";
import Finish from "../screens/onbodyScreen/finish";
import Signin from "../screens/auth/signin";
import TabNavigation from "./tabNavigation";
import Search from "../screens/modals/search";
import Filter from "../screens/modals/filter";
import Chat from "../screens/message/chat";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import { width, height } from "../utility/constant";
import { FONTS } from "../utility/fonts";
import Terms from "../screens/dashboard/terms";
import Privacy from "../screens/dashboard/privacy";
import PaystackScreen from "../screens/profile/paystack";
import { refreshToken } from "../api/auth";
import { getUser } from "../api/user";
import { SET_PROFILE, SET_TOKEN } from "../store/authSlice";
import Forgot from "../screens/auth/forgot";
import BoostDetail from "../screens/profile/boostDetail";
import { getNotificationCount } from "../api/notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

const NavigationSetup = () => {
  const LoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const authToken = useSelector((state: RootState) => state.auth.access_token);
  const dispatch = useDispatch();
  const OnBoarded = useSelector((state: RootState) => state.auth.onBoarded);

  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState<
    boolean | Notifications.Notification
  >(false);
  const notificationListener = React.useRef<Notifications.Subscription>();
  const responseListener = React.useRef<Notifications.Subscription>();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
      },
      trigger: null,
    });
  }

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
    // console.log(token);

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

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (Boolean(LoggedIn === true && authToken !== null)) {
      timer = setInterval(() => {
        getNotificationCount(
          (response) => {
            // console.log(response);
            dispatch(SET_NOTIFICATION(response));
          },
          (error) => {
            console.log(error);
          }
        );
      }, 5000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [LoggedIn, authToken]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (Boolean(LoggedIn === true && authToken !== null)) {
      timer = setTimeout(() => {
        refreshToken(
          { expo_token: expoPushToken.length > 0 ? expoPushToken : null },
          (response) => {
            dispatch(SET_TOKEN(response.access_token));
          },
          (error) => {
            console.log(error);
          }
        );
      }, 60000);
    } else {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [LoggedIn, authToken, expoPushToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          animation: "slide_from_right",
        })}
      >
        {!OnBoarded && (
          <Stack.Group>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Body" component={Body} />
            <Stack.Screen name="Finish" component={Finish} />
          </Stack.Group>
        )}
        <Stack.Group>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="BoostDetail" component={BoostDetail} />
          <Stack.Screen name="Paystack" component={PaystackScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            animation: "slide_from_bottom",
          }}
        >
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Privacy" component={Privacy} />
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
  const { darkMode, access_token, loggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (loggedIn) {
      getUser(
        (response) => {
          dispatch(SET_PROFILE(response));
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    }
  }, [loggedIn]);

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
    <>
      <View
        className={`flex-1 w-[${width}px] h-[${height}px] bg-black`}
        style={{ backgroundColor: darkMode ? "black" : "#fff" }}
      >
        <StatusBar style={darkMode ? "light" : "dark"} />
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
        <Toast config={toastConfig} />
      </View>
    </>
  );
};

export default AppNavigator;
