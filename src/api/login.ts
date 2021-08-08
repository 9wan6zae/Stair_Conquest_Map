import axios from "../utils/axios";
import { AxiosResponse } from "axios";

export function login(nickname: string, password: string): Promise<AxiosResponse> {
  return axios.post("/login", {
    nickname,
    password,
  });
}
