import {
  View,
  Text,
  TouchableWithoutFeedback,
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { SET_ERROR, SET_LOADER, SET_SUCCESS } from "../store/formDataSlice";
import { sendEmailOTP } from "../api/auth";
import { useSelector } from "react-redux";
import { RootState } from "../store";

let timer: any = () => {};

interface IProps {
  time: number;
  execute: () => void;
  counterStyle: TextStyle;
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
const CountDowner = (forwardEmail?: string | null) => {
  const [timeLeft, setTimeLeft] = React.useState(60);
  const ref = React.useRef<number>(0);
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.formData.authData);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1300);
  };

  React.useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });

  React.useEffect(() => {
    if (ref.current === 0) {
      dispatch(SET_LOADER(true));
      sendEmailOTP(
        { email: forwardEmail ? forwardEmail : email },
        (response) => {
          dispatch(SET_LOADER(false));
          dispatch(SET_SUCCESS(response.message));
        },
        (error) => {
          dispatch(SET_LOADER(false));
          dispatch(SET_ERROR(error));
        }
      );
      ref.current = 1;
    }
  }, []);

  const start = () => {
    setTimeLeft(60);
    clearTimeout(timer);
    startTimer();
  };

  return { timeLeft, start };
};

export default CountDowner;
