import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { RegisterAccessibilityParams, GetAccessibilityParams } from "../types/Accessibility";

// 리스트 추가

export function register(params: RegisterAccessibilityParams): Promise<AxiosResponse> {
  return axios.post("/registerAccessibility", params);
}

export function getAccessibility(params: GetAccessibilityParams): Promise<AxiosResponse> {
  return axios.post("/getAccessibility", params);
}
