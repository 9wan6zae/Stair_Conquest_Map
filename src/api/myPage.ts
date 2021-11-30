import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { UpdateUserInfoParams } from "../types/MyPage";

export function getMyPageViewData(): Promise<AxiosResponse> {
  return axios.post("/getMyPageViewData");
}

export function listConqueredPlaces(): Promise<AxiosResponse> {
  return axios.post("listConqueredPlaces");
}

export function updateProfile(params: UpdateUserInfoParams): Promise<AxiosResponse> {
  return axios.post("updateUserInfo", params);
}