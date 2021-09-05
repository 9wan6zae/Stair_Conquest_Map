import { StringValue } from "./Model";


export interface SignUpParams {
  nickname: string;
  instagramId: StringValue | undefined;
  password: string;
}

export interface LoginParams {
  nickname: string;
  password: string;
}