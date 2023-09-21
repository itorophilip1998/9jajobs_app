import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import SmallText from "./smallText";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({
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
  return (
    <>
      <Pressable
        onPress={() => setDateActive(true)}
        className="w-full h-auto py-3 px-3 bg-[#E1FCCF] rounded-md"
      >
        <SmallText className="p-0 text-left">
          {date === "" ? new Date().toISOString().split("T")[0] : date}
        </SmallText>
      </Pressable>
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

export default DatePicker;
