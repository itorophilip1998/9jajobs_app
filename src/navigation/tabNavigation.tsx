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
import Dashboard from "../screens/dashboard/dashboard";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F0F0F",
          borderTopWidth: 0,
          // borderTopRightRadius: 20,
          // borderTopLeftRadius: 20,
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
          if (route.name === "Dashboard") {
            return <Foundation name="home" size={size} color={color} />;
          } else if (route.name === "Listing") {
            return <FontAwesome name="star" size={size} color={color} />;
          } else if (route.name === "Post") {
            return <Entypo name="plus" size={size} color={color} />;
          } else if (route.name === "Message") {
            return (
              <Ionicons
                name="md-chatbox-ellipses-outline"
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
        name="Dashboard"
        options={{ tabBarLabel: "Home" }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Listing"
        options={{ tabBarLabel: "Listings" }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Post"
        options={{ tabBarLabel: "Post" }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Message"
        options={{ tabBarLabel: "Messages" }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Setting"
        options={{ tabBarLabel: "Profile" }}
        component={Dashboard}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
