import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { LoginAction } from './types';
import { loginUserAsync } from './actions';
import * as loginAPI from '../../api/login'

export function loginUserThunk(nickname: string, password: string): ThunkAction<void, RootState, null, LoginAction> {
  return async dispatch => {
    const { request, success, failure } = loginUserAsync;
    dispatch(request());
    try {
      const response = await loginAPI.login({nickname, password});
      if (response.status === 200) {
        localStorage.setItem("access_token", response.headers["x-ourmap-access-key"]);
        dispatch(success(true));
        document.location.href="/"
      }
    } catch (e) {
      console.log(e)
      dispatch(failure(e));
    }
  };
}