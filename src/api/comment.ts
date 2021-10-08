import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { RegisterBuildingAccessibilityCommentParams, RegisterPlaceAccessibilityCommentParams} from "../types/Comment";

// 리스트 추가

export function registerPlaceAccessibilityComment(params: RegisterPlaceAccessibilityCommentParams): Promise<AxiosResponse> {
  return axios.post("/registerPlaceAccessibilityComment", params);
}

export function registerBuildingAccessibilityComment(params: RegisterBuildingAccessibilityCommentParams): Promise<AxiosResponse> {
  return axios.post("/registerBuildingAccessibilityComment", params);
}