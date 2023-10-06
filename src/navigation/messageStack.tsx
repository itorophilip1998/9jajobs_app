import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Message from "../screens/message";

const Stack = createNativeStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        animation: "slide_from_right",
      })}
    >
      <Stack.Screen name="MessageList" component={Message} />
    </Stack.Navigator>
  );
};

export default MessageStack;
