import axios from "../utils/axios";
import { AxiosResponse } from "axios";

// 리스트 추가

export function getHomeViewData(): Promise<AxiosResponse> {
  return axios.post("/getHomeViewData");
}
