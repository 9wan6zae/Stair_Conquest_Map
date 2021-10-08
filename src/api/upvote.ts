import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { GiveBuildingAccessibilityUpvoteParams } from "../types/UpVote";

// 리스트 추가

export function giveUpVote(params: GiveBuildingAccessibilityUpvoteParams): Promise<AxiosResponse> {
  return axios.post("/giveBuildingAccessibilityUpvote", params);
}