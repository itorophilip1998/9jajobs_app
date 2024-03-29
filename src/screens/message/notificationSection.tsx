import { View, FlatList, Pressable } from "react-native";
import React from "react";
import { Spacer, SmallText, Button } from "../../components";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useIsFocused } from "@react-navigation/native";
import {
  getNotification,
  getNotificationCount,
  markReadNotification,
} from "../../api/notification";
import Toast from "react-native-toast-message";
import { SET_LOADER, SET_NOTIFICATION } from "../../store/formDataSlice";
import moment from "moment";
import { GradientText } from "../../components/gradientText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const NotificationSection = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const [notificationList, setNotificationList] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const getUsersNotifications = () => {
    dispatch(SET_LOADER(true));
    markReadNotification(
      (response1) => {
        getNotificationCount(
          (response) => {
            dispatch(SET_NOTIFICATION(response));
            getNotification(
              (response) => {
                dispatch(SET_LOADER(false));
                setLoaded(true);
                setNotificationList(response.notifications);
              },
              (error) => {
                Toast.show({
                  type: "error",
                  text1: error,
                });
                setLoaded(true);
                dispatch(SET_LOADER(false));
              }
            );
          },
          (error) => {
            setLoaded(true);
            Toast.show({
              type: "error",
              text1: error,
            });
            dispatch(SET_LOADER(false));
          }
        );
      },
      (error) => {
        setLoaded(true);
        Toast.show({
          type: "error",
          text1: error,
        });
        dispatch(SET_LOADER(false));
      }
    );
  };

  React.useEffect(() => {
    if (focus) {
      getUsersNotifications();
    }
  }, [focus]);

  return (
    <FlatList
      className="flex-1"
      showsVerticalScrollIndicator={false}
      data={notificationList}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Spacer value={H("1%")} axis="vertical" />}
      ListFooterComponent={() => <Spacer value={H("1%")} axis="vertical" />}
      ListEmptyComponent={
        loaded ? (
          <>
            <View
              className="flex-1 w-full h-full justify-center items-center px-4"
              style={{ height: H("71%") }}
            >
              <GradientText className="!text-[#626262] text-center text-[20px] font-RedHatDisplaySemiBold mt-3">
                Oops! No Notification Found
              </GradientText>
              <Spacer value={H("2%")} axis="vertical" />
              <Button
                text="Back to Home"
                onPress={() => navigation.navigate("Dashboard")}
                buttonStyleClassName="rounded-md"
                buttonStyle={{ width: "100%" }}
              />
            </View>
          </>
        ) : null
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            // item?.booking &&
            // navigation.navigate("BookingDetails", { data: item?.booking })
            navigation.navigate("Notification", { data: item })
          }
          style={{ backgroundColor: darkMode ? "#0F0F0F" : "white" }}
          className="bg-[#0F0F0F] py-4 px-3 flex-row justify-between"
        >
          <View className="flex-1 pr-6 flex-row items-center">
            <View className="h-[60px] justify-center">
              <SmallText
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="text-[#D4E1D2] font-RedHatDisplaySemiBold text-left p-0 text-[18px] mb-2"
              >
                {item.title || "Notification"}
              </SmallText>
              <SmallText
                // numberOfLine={1}
                style={{ color: darkMode ? "#D4E1D2" : "#0f0f0f" }}
                className="text-left p-0 text-[14px] text-[#696969]"
              >
                {item.message}
              </SmallText>
            </View>
          </View>
          <View className="h-[60px] justify-center items-end">
            <SmallText className="text-right p-0 text-[14px] text-[#696969]">
              {moment(item.created_at).format("DD/MM/YYYY")}
            </SmallText>
          </View>
        </Pressable>
      )}
    />
  );
};

export default NotificationSection;
