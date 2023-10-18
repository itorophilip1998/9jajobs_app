import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/dashboard/dashboard";
import Category from "../screens/dashboard/category";
import Freelancers from "../screens/dashboard/freelancers";
import FreelancerProfile from "../screens/dashboard/freelancerProfile";
import Reviews from "../screens/dashboard/reviews";
import AddReview from "../screens/dashboard/addReview";
import Report from "../screens/dashboard/report";
import NearestListing from "../screens/dashboard/nearestListing";
import TrendingListing from "../screens/dashboard/trendingList";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        animation: "slide_from_right",
      })}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="NearestListing" component={NearestListing} />
      <Stack.Screen name="TrendingListing" component={TrendingListing} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Freelancers" component={Freelancers} />
      <Stack.Screen name="FreelancerProfile" component={FreelancerProfile} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
};

export default HomeStack;
