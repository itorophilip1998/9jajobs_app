import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontLoaded] = useFonts({
    "RedHatDisplay-Black": require("../../assets/fonts/RedHatDisplay-Black.ttf"),
    "RedHatDisplay-BlackItalic": require("../../assets/fonts/RedHatDisplay-BlackItalic.ttf"),
    "RedHatDisplay-Bold": require("../../assets/fonts/RedHatDisplay-Bold.ttf"),
    "RedHatDisplay-BoldItalic": require("../../assets/fonts/RedHatDisplay-BoldItalic.ttf"),
    "RedHatDisplay-ExtraBold": require("../../assets/fonts/RedHatDisplay-ExtraBold.ttf"),
    "RedHatDisplay-ExtraBoldItalic": require("../../assets/fonts/RedHatDisplay-ExtraBoldItalic.ttf"),
    "RedHatDisplay-Italic": require("../../assets/fonts/RedHatDisplay-Italic.ttf"),
    "RedHatDisplay-Light": require("../../assets/fonts/RedHatDisplay-Light.ttf"),
    "RedHatDisplay-LightItalic": require("../../assets/fonts/RedHatDisplay-LightItalic.ttf"),
    "RedHatDisplay-Medium": require("../../assets/fonts/RedHatDisplay-Medium.ttf"),
    "RedHatDisplay-MediumItalic": require("../../assets/fonts/RedHatDisplay-MediumItalic.ttf"),
    "RedHatDisplay-Regular": require("../../assets/fonts/RedHatDisplay-Regular.ttf"),
    "RedHatDisplay-SemiBold": require("../../assets/fonts/RedHatDisplay-SemiBold.ttf"),
    "RedHatDisplay-SemiBoldItalic": require("../../assets/fonts/RedHatDisplay-SemiBoldItalic.ttf"),
  });

  return fontLoaded;
};
