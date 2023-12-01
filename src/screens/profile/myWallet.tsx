import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import TitleWithButton from "../../components/titleWithButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import {
  BottomSheet,
  Button,
  InputField,
  PrimaryText,
  SmallText,
  Spacer,
} from "../../components";
import FundIcon from "../../../assets/icons/fund.svg";
import PaymentIcon from "../../../assets/icons/payment.svg";
import WithdrawIcon from "../../../assets/icons/withdraw.svg";
import { TRANSACTION } from "../../data/transactions";
import { COLORS } from "../../utility/colors";
import { FirstLetterUppercase } from "../../utility/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import RBSheet from "react-native-raw-bottom-sheet";
import { paystackProps } from "react-native-paystack-webview";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SET_ERROR, SET_LOADER } from "../../store/formDataSlice";
import {
  getAccountName,
  getBanks,
  getWalletDetails,
  initiateWalletTransaction,
  transfer,
} from "../../api/wallet";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

const MyWallet = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const [details, setDetails] = React.useState<any>(null);
  const [acctNo, setAcctNo] = React.useState<string>("");
  const [bank, setBank] = React.useState<any>(null);
  const [banks, setBanks] = React.useState<any[]>([]);
  const [acctName, setAcctName] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const { darkMode } = useSelector((state: RootState) => state.auth);
  const withdrawRef = React.useRef<RBSheet | null>(null);
  const fundRef = React.useRef<RBSheet | null>(null);

  React.useEffect(() => {
    if (focus)
      getBanks(
        (response) => {
          setBanks(response.data);
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
  }, [focus]);

  React.useEffect(() => {
    if (acctNo.length === 10 && bank) {
      dispatch(SET_LOADER(true));
      getAccountName(
        {
          acct_no: Number(acctNo),
          bank_code: bank?.code,
        },
        (response) => {
          dispatch(SET_LOADER(false));
          setAcctName(response.data.account_name);
        },
        (error) => {
          dispatch(SET_LOADER(false));
          Toast.show({
            type: "error",
            text1: error,
          });
        }
      );
    } else setAcctName("");
  }, [bank, acctNo]);

  React.useEffect(() => {
    if (focus) {
      dispatch(SET_LOADER(true));
      getWalletDetails(
        null,
        (response) => {
          console.log(response);
          setDetails(response);
          dispatch(SET_LOADER(false));
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: error,
          });
          dispatch(SET_LOADER(false));
        }
      );
    }
  }, [focus]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{
        width: width,
        height: height,
        backgroundColor: darkMode ? "black" : "#D4E1D2",
      }}
    >
      <SafeAreaView className="flex-1 w-full ">
        <View
          style={{ backgroundColor: darkMode ? "black" : "#FFFFFF" }}
          className="relative flex flex-row items-center w-full justify-between px-3 bg-[#0f0f0f]"
        >
          <TitleWithButton title="Wallet" fire={() => navigation.goBack()} />
        </View>
        <Spacer value={H("3%")} axis="vertical" />
        <View className="w-full px-3">
          <View
            className="h-[150px] w-full rounded-2xl bg-[#0F0F0F] justify-center"
            style={{
              backgroundColor: darkMode ? "#0F0F0F" : "#FFFFFF",
              borderWidth: darkMode ? 1 : 0,
              borderColor: darkMode ? "#696969" : "transparent",
            }}
          >
            <SmallText className="text-[#696969] font-RedHatDisplaySemiBold text-center p-0 text-[20px]">
              Available Balance
            </SmallText>
            <Spacer value={H("1%")} axis="vertical" />
            <GradientText className="text-primary font-RedHatDisplaySemiBold text-center p-0 text-[20px]">
              ₦ {details?.balance?.toLocaleString() || 0}
            </GradientText>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-full flex-row justify-evenly items-center">
            <TouchableOpacity onPress={() => fundRef.current?.open()}>
              <FundIcon />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-[#696969] text-[14px] text-left p-0 pt-2"
              >
                Fund Wallet
              </SmallText>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
              <PaymentIcon />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-[#696969] text-[14px] text-left p-0 pt-2"
              >
                Payment
              </SmallText>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => withdrawRef.current?.open()}>
              <WithdrawIcon />
              <SmallText
                style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
                className="text-[#696969] text-[14px] text-left p-0 pt-2"
              >
                Withdraw
              </SmallText>
            </TouchableOpacity>
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <View className="w-full flex-row justify-between items-center">
            <SmallText
              style={{ color: darkMode ? "#6A6A6A" : "#0f0f0f" }}
              className="text-[#6A6A6A] text-center p-0 text-[20px] mb-4"
            >
              Transaction History
            </SmallText>
            {/* <GradientText className="text-primary font-RedHatDisplaySemiBold text-center p-0 text-[15px]">
              View All
            </GradientText> */}
          </View>
        </View>
        <FlatList
          className="px-3 mt-3"
          showsVerticalScrollIndicator={false}
          data={details?.transactions}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Spacer value={H("3%")} axis="vertical" />
          )}
          ListFooterComponent={<Spacer value={H("3%")} axis="vertical" />}
          renderItem={({ item }) => (
            <Pressable className="w-full">
              <View className="flex-row justify-between items-center w-full mb-1">
                <SmallText
                  style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
                  className="text-[#BDB7C5] text-left p-0 text-[18px]"
                >
                  {FirstLetterUppercase(item.purpose)}
                </SmallText>
                <SmallText
                  style={{ color: darkMode ? "#BDB7C5" : "#0f0f0f" }}
                  className="text-[#BDB7C5] text-right p-0 text-[18px]"
                >
                  ₦ {item.amount.toLocaleString()}
                </SmallText>
              </View>
              <View className="flex-row justify-between items-center w-full">
                <SmallText className="text-[#696969] text-left p-0 text-[15px]">
                  {item.description}
                </SmallText>
                <SmallText
                  style={{
                    color:
                      item.type === "debit" ? COLORS.danger : COLORS.primary,
                  }}
                  className="text-[#6A6A6A] text-right p-0 text-[15px]"
                >
                  {FirstLetterUppercase(item.type)}
                </SmallText>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
      <BottomSheet ref={withdrawRef} duration={3000} height={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          className="flex-1 bg-[#1b1b1b] py-5 px-3"
        >
          <View className="w-full">
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Amount
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setAmount(value);
              }}
              placeholder="Enter Amount"
              defaultValue={amount}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"numeric"}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Account Number
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setAcctNo(value);
              }}
              placeholder="input your account number"
              defaultValue={acctNo}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"numeric"}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Bank Name
            </SmallText>
            <SelectDropdown
              data={banks}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              // defaultValue={bank?.name || ""}
              buttonStyle={{
                width: "100%",
                backgroundColor: darkMode ? "black" : "white",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#696969",
              }}
              buttonTextStyle={{ textAlign: "left", fontSize: 16 }}
              buttonTextAfterSelection={(selectedItem, index) => {
                setBank(selectedItem);
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
            />
            <Spacer value={H("2%")} axis="vertical" />
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Account Name
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setAcctName(value);
              }}
              placeholder="input your account name"
              defaultValue={acctName}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"default"}
              editable={false}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <Button
            text="Withdraw"
            buttonStyle={{ width: "100%" }}
            onPress={() => {
              withdrawRef.current?.close();
              dispatch(SET_LOADER(true));
              transfer(
                {
                  type: bank?.type,
                  account_number: acctNo,
                  name: acctName,
                  bank_code: bank?.code,
                  amount: Number(amount + "00"),
                  currency: "NGN",
                },
                (response) => {
                  console.log(response);
                  initiateWalletTransaction(
                    // search by name and phone_number - create LGA, search user, create service
                    // filter debit, credit, lga, area-unit, clear filter
                    // landing page to nasarrawa and logos edit logo
                    {
                      amount: Number(amount) || 0,
                      purpose: "withdrawal",
                      status: "success",
                      type: "debit",
                      description: "Wallet withdrawal.",
                      ref_number: response.data.reference,
                      trans_id: response.data.transfer_code,
                    },
                    (response) => {
                      dispatch(SET_LOADER(false));
                      Toast.show({
                        type: "success",
                        text1: response?.message,
                      });
                    },
                    (error) => {
                      dispatch(SET_LOADER(false));
                      Toast.show({
                        type: "error",
                        text1: error,
                      });
                    }
                  );
                },
                (error) => {
                  dispatch(SET_LOADER(false));
                  Toast.show({
                    type: "error",
                    text1: "Network is currently down. Please try again later.",
                  });
                }
              );
            }}
          />
          <Spacer value={H("6%")} axis="vertical" />
        </ScrollView>
      </BottomSheet>

      <BottomSheet ref={fundRef} duration={3000} height={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: darkMode ? "#1b1b1b" : "#D4E1D2" }}
          className="flex-1 bg-[#1b1b1b] py-5 px-3"
        >
          <View className="w-full">
            <SmallText
              style={{ color: darkMode ? "#D4E1D2" : "#0F0F0F" }}
              className="text-[#D4E1D2] text-left p-0 text-[17px] mb-3 font-RedHatDisplayRegular"
            >
              Amount
            </SmallText>
            <InputField
              style={{ backgroundColor: darkMode ? "black" : "white" }}
              onTextChange={function (value: string): void {
                setAmount(value);
              }}
              placeholder="Enter Amount"
              defaultValue={amount}
              className="border border-[#696969] bg-[#000000]"
              containerStyle={{ width: "100%" }}
              type={"numeric"}
              autoCapitalize={"none"}
            />
            <Spacer value={H("2%")} axis="vertical" />
          </View>
          <Spacer value={H("3%")} axis="vertical" />
          <Button
            text="Fund Now"
            buttonStyle={{ width: "100%" }}
            onPress={() => {
              fundRef.current?.close();
              navigation.navigate("Paystack", { amount });
            }}
          />
          <Spacer value={H("6%")} axis="vertical" />
        </ScrollView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

export default MyWallet;
