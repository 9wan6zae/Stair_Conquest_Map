import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { LoginAction } from './types';
import { loginUserAsync } from './actions';
import * as loginAPI from '../../api/login'

export function loginUserThunk(nickname: string, password: string): ThunkAction<void, RootState, null, LoginAction> {
  return async dispatch => {
    const { request, success, failure } = loginUserAsync;
    dispatch(request());
    console.log(nickname, password)
    try {
      const response = await loginAPI.login(nickname, password);
      console.log(response)
      if (response.status === 200) {
        // localStorage.setItem("access_token", `JWT ${response.data.Token}`);
        console.log('success')
        dispatch(success(true));
      }
    } catch (e) {
      console.log(e)
      dispatch(failure(e));
    }
  };
}