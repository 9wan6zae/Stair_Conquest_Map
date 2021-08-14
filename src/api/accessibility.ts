import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { RegisterAccessibilityParams } from "../types/Accessibility";

// 리스트 추가

export function register(params: RegisterAccessibilityParams): Promise<AxiosResponse> {
  return axios.post("/registerAccessibility", params);
}
