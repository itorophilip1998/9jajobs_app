import { View, Text } from "react-native";
import React from "react";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Profile from "../screens/profile";
import EditProfile from "../screens/profile/editProfile";
import MyWallet from "../screens/profile/myWallet";
import Payment from "../screens/profile/payment";
import Bookings from "../screens/profile/bookings";
import Referrals from "../screens/profile/referrals";
import Packages from "../screens/profile/packages";
import MyReviews from "../screens/profile/myReviews";
import Verification from "../screens/profile/verification";
import BoostPost from "../screens/profile/boostPost";
import MyListing from "../screens/profile/myListing";
import EditListing from "../screens/profile/editListing";
import { useIsFocused } from "@react-navigation/native";
import { useAuthorize } from "../hooks/useAuthorized";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Stack = createNativeStackNavigator();

const ProfileStack = ({
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
        navigation.navigate("Signin");
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="Referrals" component={Referrals} />
      <Stack.Screen name="Packages" component={Packages} />
      <Stack.Screen name="MyReviews" component={MyReviews} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="BoostPost" component={BoostPost} />
      <Stack.Screen name="MyListing" component={MyListing} />
      <Stack.Screen name="EditListing" component={EditListing} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
