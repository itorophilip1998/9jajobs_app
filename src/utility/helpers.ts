import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { SET_ERROR } from "../store/formDataSlice";
import moment from "moment";
import Toast from "react-native-toast-message";

export const FormatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string, length = 11) => {
  return phone.match(/\d/g)!.length === length;
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const convertToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const parts = uri.split("/");
  const fileName = parts[parts.length - 1];

  return new File([blob], fileName, { type: blob.type });
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (confirmPassword !== password) {
    return false;
  } else {
    return true;
  }
};

export const CalendarMonthName = (month: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};

export const DelayFor = (number = 2000, fire: () => void) => {
  setTimeout(() => fire(), number);
};

export const FirstLetterUppercase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const TruncateString = (string: string, index = 20) => {
  return string.length > index ? string.substring(0, index) + "..." : string;
};

export const DateString = (
  dateData: string | number | Date,
  showYear = true
) => {
  let date = new Date(dateData);
  let day: string | number = date.getDate();
  if (day < 2) {
    if (day == 1) day = day + "st";
    else if (day == 2) day = day + "nd";
    else if (day == 3) day = day + "rd";
    else day = day + "th";
  } else {
    if (day == 1) day = day + "st";
    else if (day == 2) day = day + "nd";
    else if (day == 3) day = day + "rd";
    else day = day + "th";
  }
  let month: number = date.getMonth();
  let year: string | number = date.getFullYear();

  // extract am and pm
  let ampm = date.getHours() >= 12 ? "pm" : "am";
  let hours: string | number = date.getHours() % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  let minutes: string | number = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = "@ " + hours + ":" + minutes + " " + ampm;
  year = showYear ? year : "";
  let dateString =
    day +
    " " +
    FirstLetterUppercase(CalendarMonthName(month)) +
    " " +
    year +
    " " +
    strTime;
  return dateString;
};

export const VALIDATE_USER_DATA = (data: any, execute: (arg0: any) => void) => {
  for (const [key, value] of Object.entries(data)) {
    if (value === "") {
      let errorMessage = "";
      switch (key) {
        case "fullName":
          errorMessage = "Name";
          break;
        case "phoneNumber":
          errorMessage = "Phone Number";
          break;
        default:
          errorMessage = key.charAt(0).toUpperCase() + key.slice(1);
          break;
      }
      Toast.show({ type: "error", text1: `${errorMessage} is invalid` });
      return false;
    }
  }

  execute(data);
};

function formatDateWithMoment(date: string) {
  const targetDate = moment(date);

  return targetDate.calendar(null, {
    sameDay: "[today]", // Use '[today]' to display 'today' for the same day
    nextDay: "[tomorrow]",
    nextWeek: "dddd", // Display the day of the week for dates within the next week
    lastDay: "[yesterday]",
    lastWeek: "dddd", // Display the day of the week for dates within the last week
    sameElse: "MMM D, YYYY", // Display the date in the format 'MMM D, YYYY' for other dates
  });
}

export const transformTransaction = (transactions: any) => {
  const sortedTransaction = transactions.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  let formattedData: any = [];
  sortedTransaction.map((i: any) => {
    let m = formatDateWithMoment(i.createdAt);
    formattedData.push({ ...i, since: m });
  });

  let newFormatted: { [key: string]: any } = {};

  formattedData.map((i: any) => {
    if (i.since)
      if (!!newFormatted[i.since] == true) {
        newFormatted[i.since].push(i);
      } else {
        newFormatted[i.since] = [];
        newFormatted[i.since].push(i);
      }
  });

  return Object.entries(newFormatted);
};

export function isValidDate(day: number, month: number, year: number): boolean {
  const date = new Date(year, month - 1, day); // Note: Month is 0-indexed in JavaScript Dates

  // Check if the input values match the created date
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

export const toggleStringInArray = (
  targetArray: string[],
  targetString: string
): string[] => {
  const stringIndex = targetArray.indexOf(targetString);

  if (stringIndex !== -1) {
    // String exists, remove it
    targetArray.splice(stringIndex, 1);
  } else {
    // String doesn't exist, add it
    targetArray.push(targetString);
  }

  return [...targetArray]; // Return a new array to trigger a state update
};

export const validateUrl = (str: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
};

export function isFacebookLink(url: string) {
  const facebookPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/.*/;
  return facebookPattern.test(url);
}

export function isLinkedInLink(url: string) {
  const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*/;
  return linkedinPattern.test(url);
}

export function isTwitterLink(url: string) {
  const twitterPattern = /^(https?:\/\/)?(www\.)?twitter\.com\/.*/;
  return twitterPattern.test(url);
}

export function isInstagramLink(url: string) {
  const instagramPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/.*/;
  return instagramPattern.test(url);
}