import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { VillageAction } from './types';
import { AsyncAction } from './actions';
import * as homeAPI from '../../api/home';

export function villageThunk(): ThunkAction<void, RootState, null, VillageAction> {
  return async dispatch => {
    const { request, success, failure } = AsyncAction;
    dispatch(request());
    try {
      const response = await homeAPI.getHomeViewData();
      if (response.status === 200) {
        dispatch(success(response.data.entries));
      }
    } catch (e: any) {
      dispatch(failure(e));
    }
  };
}