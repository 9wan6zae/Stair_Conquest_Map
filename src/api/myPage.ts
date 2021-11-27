import axios from "../utils/axios";
import { AxiosResponse } from "axios";

export function getMyPageViewData(): Promise<AxiosResponse> {
  return axios.post("/getMyPageViewData");
}

export function listConqueredPlaces(): Promise<AxiosResponse> {
  return axios.post("listConqueredPlaces");
}