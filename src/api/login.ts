import axios from "../utils/axios";
import { AxiosResponse } from "axios";
import { LoginParams, SignUpParams } from "../types/Sign";

export function login(params: LoginParams): Promise<AxiosResponse> {
  return axios.post("/login", params);
}

export function signUp (params: SignUpParams): Promise<AxiosResponse> {
  return axios.post("/signUp", params);
}
