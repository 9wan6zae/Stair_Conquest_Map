import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
export type LoginAction = ActionType<typeof actions>;

export type LoginState = {
  loginSuccess: boolean,
  loginError: boolean
};