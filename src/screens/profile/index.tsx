import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { width, height } from "../../utility/constant";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { SmallText, Title } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../utility/colors";
import WalletIcon from "../../../assets/icons/wallet.svg";
import BookingIcon from "../../../assets/icons/booking.svg";
import ReferralIcon from "../../../assets/icons/referral.svg";
import PackageIcon from "../../../assets/icons/package.svg";
import ReviewIcon from "../../../assets/icons/review.svg";
import VerifyIcon from "../../../assets/icons/verify.svg";
import ListingIcon from "../../../assets/icons/listing.svg";
import BoostIcon from "../../../assets/icons/ads.svg";
import PrivacyIcon from "../../../assets/icons/privacy.svg";
import FeedBackIcon from "../../../assets/icons/feedback.svg";
import FaqIcon from "../../../assets/icons/faq.svg";
import AboutIcon from "../../../assets/icons/about.svg";
import ProfileMenuCard from "../../components/profileMenuCard";

const routes = [
  { path: "MyWallet", name: "My Wallet", icon: WalletIcon },
  { path: "Bookings", name: "Bookings", icon: BookingIcon },
  { path: "Referrals", name: "Referrals", icon: ReferralIcon },
  { path: "Packages", name: "Packages", icon: PackageIcon },
  { path: "MyReviews", name: "My Reviews", icon: ReviewIcon },
  { path: "Verification", name: "Verification", icon: VerifyIcon },
  { path: "MyListing", name: "My Listing", icon: ListingIcon },
  { path: "BoostPost", name: "Boost Post", icon: BoostIcon },
  { path: "https://9jajob.com", name: "Privacy Policy", icon: PrivacyIcon },
  { path: "https://9jajob.com", name: "Feedback", icon: FeedBackIcon },
  { path: "https://9jajob.com", name: "FAQ", icon: FaqIcon },
  { path: "https://9jajob.com", name: "About", icon: AboutIcon },
];

const Profile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  //   const sortRef = React.useState<RBSheet | null>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 items-center bg-black"
      style={{ width: width, height: height }}
    >
      <View className="h-[30%] bg-[#0f0f0f] w-full pt-5" />
      <SafeAreaView className="absolute left-0 top-0 flex-1 w-full h-full px-3 py-4">
        <Title className="text-center text-[#D4E1D2] text-[24px] py-4 ">
          My Account
        </Title>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
          }}
          alt=""
          className=" w-[70%] mx-auto h-[170px] my-3 rounded-lg"
        />
        <View className="flex-row item-center justify-center pl-4">
          <View>
            <SmallText className="text-center p-0 font-RedHatDisplayBold text-[#D4E1D2] text-[22px]">
              Victor Daniel
            </SmallText>
            <SmallText className="text-center p-0 text-[#696969] text-[18px] pb-2">
              Victordaniel@gmail.com
            </SmallText>
          </View>
          <AntDesign
            name="setting"
            size={30}
            color={COLORS.primary}
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          className="w-full px-3 pb-3"
        >
          {routes.map((item, idx) => (
            <ProfileMenuCard navigation={navigation} item={item} key={idx} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
