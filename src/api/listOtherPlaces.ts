import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { ListPlacesInBuildingParams } from "../types/ListPlacesInBuilding";

// 리스트 추가

export function listPlacesInBuilding(params: ListPlacesInBuildingParams): Promise<AxiosResponse> {
  return axios.post("/listPlacesInBuilding", params);
}
