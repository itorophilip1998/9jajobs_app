import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";

export const useAuthorize = () => {
  const { loggedIn, access_token } = useSelector(
    (state: RootState) => state.auth
  );
  const focused = useIsFocused();
  const [auth, setAuth] = React.useState(Boolean(loggedIn && access_token));

  React.useEffect(() => {
    if (Boolean(loggedIn && access_token)) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [focused, loggedIn, access_token]);

  return { authenticate: auth };
};
