import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import SmallText from "./smallText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputField from "./inputField";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const DatePicker = ({
  isDate,
  setDateActive,
  date,
  setDate,
}: {
  isDate: boolean;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
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
        containerClassName="border border-[#696969] bg-[#000000]"
        containerStyle={{
          width: "100%",
          backgroundColor: darkMode ? "black" : "white",
        }}
        type={"numeric"}
        autoCapitalize={"none"}
        dropdown
        onSuffixTap={() => setDateActive(true)}
        suffixIcon={<></>}
      />
      <DateTimePickerModal
        is24Hour={false}
        isVisible={isDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onConfirm={(date) => {
          const dateString: string = date?.toISOString().split("T")[0];
          setDate(dateString);
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
  setTime,
}: {
  isTime: boolean;
  time: string;
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
        containerClassName="border border-[#696969] bg-[#000000]"
        containerStyle={{
          width: "100%",
          backgroundColor: darkMode ? "black" : "white",
        }}
        type={"numeric"}
        autoCapitalize={"none"}
        dropdown
        onSuffixTap={() => setTimeActive(true)}
        suffixIcon={<></>}
      />

      <DateTimePickerModal
        is24Hour={false}
        isVisible={isTime}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onConfirm={(date) => {
          const dateString: string = date?.toISOString().split("T")[0];
          setTime(dateString);
          setTimeActive(false);
        }}
        onCancel={() => setTimeActive(false)}
      />
    </>
  );
};
