import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config["headers"] = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    };
  } else {
    config["headers"] = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  return config;
});

export default instance;
