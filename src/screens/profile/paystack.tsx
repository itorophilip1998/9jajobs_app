import { View, Text } from "react-native";
import React from "react";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../../store/formDataSlice";
import { initiateWalletTransaction } from "../../api/wallet";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PaystackScreen = ({
  navigation,
  route,
}: {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.auth);
  return (
    <SafeAreaView className="flex-1">
      <View style={{ flex: 1 }}>
        <Paystack
          paystackKey="pk_test_b9ac9968f82485184ceaa9a31ab524bdc9efb58c"
          billingEmail={profile?.email}
          amount={route.params?.amount || "0" + ".00"}
          channels={["card", "bank", "ussd", "qr", "mobile_money"]}
          autoStart={true}
          activityIndicatorColor="transparent"
          onCancel={(e) => {
            // handle response here
            console.log(e);
            navigation.goBack();
          }}
          onSuccess={(res) => {
            // handle response here
            navigation.goBack();
            dispatch(SET_LOADER(true));
            initiateWalletTransaction(
              {
                amount: route.params?.amount || 0,
                purpose: "top-up",
                status: "success",
                type: "credit",
                description: "Funded your wallet account.",
                ref_number: res.data.transactionRef.reference,
                trans_id: res.data.transactionRef.trans,
              },
              (response) => {
                dispatch(SET_LOADER(false));
                route.params?.callback && route.params?.callback(); 
              },
              (error) => {
                dispatch(SET_LOADER(false));
                Toast.show({
                  type: "error",
                  text1: error,
                });
              }
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaystackScreen;
