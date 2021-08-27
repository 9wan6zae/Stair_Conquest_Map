export interface SignUpParams {
  nickname: string;
  instagramId: string | undefined;
  password: string;
}

export interface LoginParams {
  nickname: string;
  password: string;
}