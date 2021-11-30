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

instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    window.localStorage.removeItem("access_token")
    window.location.href = '/login'
  }
});

export default instance;
