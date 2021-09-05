import * as action from 'typesafe-actions'
import { AxiosError } from 'axios'

export const LOGIN_USER = 'login/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'login/LOGIN_SUCCESS'
export const LOGIN_USER_ERROR = 'login/LOGIN_ERROR'

export const loginUserAsync = action.createAsyncAction(
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
)<undefined, boolean, AxiosError>()