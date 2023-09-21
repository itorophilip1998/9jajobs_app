/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A911B",
        primaryBG: ""
      },
      fontFamily: {
        RedHatDisplayBlack: ["RedHatDisplay-Black"],
        RedHatDisplayBlackItalic: ["RedHatDisplay-BlackItalic"],
        RedHatDisplayBold: ["RedHatDisplay-Bold"],
        RedHatDisplayBoldItalic: ["RedHatDisplay-BoldItalic"],
        RedHatDisplayExtraBold: ["RedHatDisplay-ExtraBold"],
        RedHatDisplayExtraBoldItalic: ["RedHatDisplay-ExtraBoldItalic"],
        RedHatDisplayItalic: ["RedHatDisplay-Italic"],
        RedHatDisplayLight: ["RedHatDisplay-Light"],
        RedHatDisplayLightItalic: ["RedHatDisplay-LightItalic"],
        RedHatDisplayMedium: ["RedHatDisplay-Medium"],
        RedHatDisplayMediumItalic: ["RedHatDisplay-MediumItalic"],
        RedHatDisplayRegular: ["RedHatDisplay-Regular"],
        RedHatDisplaySemiBold: ["RedHatDisplay-SemiBold"],
        RedHatDisplaySemiBoldItalic: ["RedHatDisplay-SemiBoldItalic"],
      },
    },
  },
  plugins: [],
};
