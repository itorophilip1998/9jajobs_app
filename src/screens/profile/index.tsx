import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
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
import SettingsIcon from "../../../assets/icons/settings.svg";
import ProfileMenuCard from "../../components/profileMenuCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GradientText } from "../../components/gradientText";
import userImg from "../../../assets/images/user.jpg";
import ShowImage from "../modals/showImage";

const routes = [
  { path: "MyWallet", name: "My Wallet", icon: WalletIcon },
  { path: "Bookings", name: "Bookings", icon: BookingIcon },
  { path: "Referrals", name: "Referrals", icon: ReferralIcon },
  // { path: "Packages", name: "Packages", icon: PackageIcon },
  { path: "Verification", name: "Verification", icon: VerifyIcon },
  { path: "MyListing", name: "My Services", icon: ListingIcon },
  { path: "BoostPost", name: "Boost Post", icon: BoostIcon },
  { path: "EditProfile", name: "Settings", icon: SettingsIcon },
  {
    path: "Privacy",
    name: "Privacy Policy",
    icon: PrivacyIcon,
  },
  {
    path: "Contact",
    name: "Contact Us",
    icon: FeedBackIcon,
  },
  { path: "Faq", name: "FAQ", icon: FaqIcon },
  {
    path: "Terms",
    name: "Terms & Condition",
    icon: PrivacyIcon,
  },
  { path: "About", name: "About", icon: AboutIcon },
];

const Profile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { darkMode, profile } = useSelector((state: RootState) => state.auth);
  const [profileImg, setProfileImg] = React.useState<string>("");
  //   const sortRef = React.useState<RBSheet | null>(null);
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
      <View
        style={{ backgroundColor: darkMode ? "#0f0f0f" : "white" }}
        className="h-[200px] bg-[#0f0f0f] w-full pt-5"
      />
      <SafeAreaView className="absolute left-0 top-0 flex-1 w-full h-full px-3 py-4">
        {darkMode ? (
          <Title className="text-center text-[#D4E1D2] text-[24px] py-4 ">
            My Account
          </Title>
        ) : (
          <GradientText className="text-center font-RedHatDisplaySemiBold text-[#D4E1D2] text-[24px] py-4">
            My Account
          </GradientText>
        )}
        <TouchableWithoutFeedback onPress={() => setProfileImg(profile?.photo)}>
          <Image
            source={
              profile?.photo
                ? {
                    uri: profile?.photo,
                  }
                : userImg
            }
            alt=""
            className=" w-[70%] mx-auto h-[170px] mb-3 mt-6 rounded-lg"
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        <View className="flex-row item-center justify-center pl-4">
          <View>
            {darkMode ? (
              <SmallText
                numberOfLine={1}
                className="text-center p-0 font-RedHatDisplayBold text-[#D4E1D2] text-[22px]"
              >
                {profile?.name}
              </SmallText>
            ) : (
              <GradientText
                numberOfLines={1}
                className="text-center p-0 font-RedHatDisplayBold text-[#D4E1D2] text-[22px]"
              >
                {profile?.name}
              </GradientText>
            )}

            <SmallText
              style={{ color: darkMode ? "#696969" : "#0f0f0f" }}
              className="text-center p-0 text-[#696969] text-[18px] pb-2"
            >
              {profile?.email}
            </SmallText>
          </View>
          {/* <AntDesign
            name="setting"
            size={30}
            color={COLORS.primary}
            // className="ml-2"
            onPress={() => navigation.navigate("EditProfile")}
          /> */}
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
        <ShowImage
          close={() => setProfileImg("")}
          img={profileImg}
          visible={!!profileImg}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
