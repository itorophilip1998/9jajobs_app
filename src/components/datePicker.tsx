import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import SmallText from "./smallText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputField from "./inputField";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AntDesign, Feather } from "@expo/vector-icons";
import moment from "moment";

export const DatePicker = ({
  isDate,
  setDateActive,
  date,
  setDate,
  className,
}: {
  isDate: boolean;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  setDateActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <InputField
        onTextChange={function (value: string): void {}}
        defaultValue={date}
        editable={false}
        placeholder="Select Date"
        containerClassName={`border border-[#696969] bg-[#000000] ${className && className}`}
        containerStyle={{
          width: "100%",
          backgroundColor: darkMode ? "black" : "white",
        }}
        type={"numeric"}
        autoCapitalize={"none"}
        dropdown
        onSuffixTap={() => setDateActive(true)}
        suffixIcon={<Feather name="calendar" size={20} color="#696969" />}
      />
      <DateTimePickerModal
        is24Hour={false}
        isVisible={isDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onConfirm={(date) => {
          setDate(moment(date).format("YYYY-MM-DD"));
          setDateActive(false);
        }}
        onCancel={() => setDateActive(false)}
      />
    </>
  );
};

export const TimePicker = ({
  isTime,
  setTimeActive,
  time,
  className,
  setTime,
}: {
  isTime: boolean;
  time: string;
  className?: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setTimeActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <InputField
        onTextChange={function (value: string): void {}}
        defaultValue={time}
        editable={false}
        placeholder="Select Time"
        containerClassName={`border border-[#696969] bg-[#000000] ${className && className}`}
        containerStyle={{
          width: "100%",
          backgroundColor: darkMode ? "black" : "white",
        }}
        type={"numeric"}
        autoCapitalize={"none"}
        dropdown
        onSuffixTap={() => setTimeActive(true)}
        suffixIcon={<AntDesign name="clockcircleo" size={20} color="#696969" />}
      />

      <DateTimePickerModal
        is24Hour={false}
        isVisible={isTime}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onConfirm={(time) => {
          setTime(moment(time).format("HH:mm"));
          setTimeActive(false);
        }}
        onCancel={() => setTimeActive(false)}
      />
    </>
  );
};
