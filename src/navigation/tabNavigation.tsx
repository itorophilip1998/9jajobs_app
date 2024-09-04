import { COLORS } from "../utility/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FONTS } from "../utility/fonts";
import {
  Foundation,
  FontAwesome,
  Entypo,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import HomeStack from "./homeStack";
import Listing from "../screens/listing";
import Post from "../screens/post";
import MessageStack from "./messageStack";
import ProfileStack from "./profileStack";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAuthorize } from "../hooks/useAuthorized";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { authenticate } = useAuthorize();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const { notification } = useSelector((state: RootState) => state.formData);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? "#0F0F0F" : "white",
          borderTopWidth: 0,
          height: 70,
          paddingTop: 10,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#696969",
        tabBarItemStyle: {
          height: 65,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.RedHatDisplayRegular,
          fontSize: 13,
          paddingBottom: 17,
        },
        tabBarIcon: ({ focused, color, size }) => {
          // let iconColor = focused ? COLORS.primary : "#696969";
          if (route.name === "HomeStack") {
            return <Foundation name="home" size={size} color={color} />;
          } else if (route.name === "Listing") {
            return <FontAwesome name="star" size={size} color={color} />;
          } else if (route.name === "Post") {
            return <Entypo name="plus" size={size} color={color} />;
          } else if (route.name === "Message") {
            return (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Setting") {
            return <FontAwesome5 name="user-alt" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        options={{ tabBarLabel: "Home" }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Listing"
        options={{ tabBarLabel: "Services" }}
        component={Listing}
      />
      <Tab.Screen
        name="Post"
        options={{
          tabBarLabel: "Post",
        }}
        component={Post}
      />
      <Tab.Screen
        name="Message"
        options={{
          tabBarLabel: "Messages",
          tabBarBadge:
            notification.notifications + notification.messages === 0
              ? undefined
              : notification.notifications + notification.messages,
          tabBarBadgeStyle: {
            top: -5,
          },
        }}
        component={MessageStack}
      />
      <Tab.Screen
        name="Setting"
        options={{ tabBarLabel: "Profile" }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
