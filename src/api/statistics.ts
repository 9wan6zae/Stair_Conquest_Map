import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { GetVillageStatisticsParams } from "../types/Statistics";

// 리스트 추가

export function getVillageStatistics(params: GetVillageStatisticsParams): Promise<AxiosResponse> {
  return axios.post("/getVillageStatistics", params);
}