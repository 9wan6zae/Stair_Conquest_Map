import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import {SearchPlacesParams} from "../types/SearchPlaces"

// 리스트 추가

export function searchPlaces(params: SearchPlacesParams): Promise<AxiosResponse> {
  return axios.post("/searchPlaces", params);
}
