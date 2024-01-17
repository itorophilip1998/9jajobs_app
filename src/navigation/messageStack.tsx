import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import Message from "../screens/message";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Notification from "../screens/message/notification";

const Stack = createNativeStackNavigator();

const MessageStack = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { loggedIn, access_token } = useSelector(
    (state: RootState) => state.auth
  );
  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused) {
      if (!Boolean(loggedIn && access_token)) {
        navigation.navigate("Signin", { two_step: true });
      }
    }
  }, [focused, loggedIn, access_token]);
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        animation: "slide_from_right",
      })}
    >
      <Stack.Screen name="MessageList" component={Message} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default MessageStack;
