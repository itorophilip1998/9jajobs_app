import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";

export const chatUser = async (
  data: {
    friend_id: string;
    message: string;
    photo: any[];
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("friend_id", data.friend_id);
  formData.append("message", data.message);
  for (let index = 0; index < data.photo.length; index++) {
    formData.append("photo[]", data.photo[index]);
  }
  var config = {
    method: "post",
    url: `${BASE_URL}/chats`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("chat-user", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error);
    } else if (!err?.response?.data?.error || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const spamUser = async (
  data: {
    friend_id: string;
    status: "spam" | "unspam";
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("friend_id", data.friend_id);
  formData.append("status", data.status);

  var config = {
    method: "post",
    url: `${BASE_URL}/spam`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("spam-user", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error);
    } else if (!err?.response?.data?.error || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const markRead = async (
  data: {
    friend_id: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("friend_id", data.friend_id);
  var config = {
    method: "post",
    url: `${BASE_URL}/unread-chats`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("mark-read", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getChats = async (
  data: {
    friend_id: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/chats/${data.friend_id}`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("get-chats", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getFriendList = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/friends`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("get-chats", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};
