import * as action from 'typesafe-actions'
import { AxiosError } from 'axios'
import { VillageRankingEntry } from '../../types/Model';

export const VILLAGE = 'village/VILLAGE'
export const VILLAGE_GET_SUCCESS = 'village/VILLAGE_SUCCESS'
export const VILLAGE_GET_ERROR = 'village/VILLAGE_ERROR'

export const AsyncAction = action.createAsyncAction(
  VILLAGE,
  VILLAGE_GET_SUCCESS,
  VILLAGE_GET_ERROR
)<undefined, VillageRankingEntry[], AxiosError>()