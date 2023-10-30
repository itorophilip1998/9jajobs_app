import { View, Text } from "react-native";
import React from "react";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const PaystackScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <SafeAreaView className="flex-1">
      <View style={{ flex: 1 }}>
        <Paystack
          paystackKey="pk_test_d012b3f0b826a6485465bf7e4794130363660afa"
          billingEmail="paystackwebview@something.com"
          amount={"25000.00"}
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
            console.log(res);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaystackScreen;
