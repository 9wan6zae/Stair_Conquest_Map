import axios, {response} from "../utils/axios";

export function login(nickname: string, password: string): Promise<response> {
  return axios.post("/login", {
    nickname,
    password,
  });
}
