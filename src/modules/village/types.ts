import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { VillageRankingEntry } from '../../types/Model';

export type VillageAction = ActionType<typeof actions>;

export type VillageState = {
  villages: VillageRankingEntry[]
};