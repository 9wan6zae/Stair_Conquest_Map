import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { SignUpParams } from "../types/Sign";

export function login(nickname: string, password: string): Promise<AxiosResponse> {
  return axios.post("/login", {
    nickname,
    password,
  });
}

export function signUp (params: SignUpParams): Promise<AxiosResponse> {
  return axios.post("/signUp", params);
}
