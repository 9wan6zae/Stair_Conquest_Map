import { createReducer } from 'typesafe-actions'
import { VillageAction, VillageState } from './types'
import { VILLAGE, VILLAGE_GET_SUCCESS, VILLAGE_GET_ERROR } from './actions'

const initState: VillageState = {
  villages: []
}

const login = createReducer<VillageState, VillageAction>(initState, {
  [VILLAGE]: state => ({
    ...state,
    villages: []
  }),
  [VILLAGE_GET_SUCCESS]: (state, action) => ({
    ...state,
    villages: action.payload,
  }),
  [VILLAGE_GET_ERROR]: state => ({
    ...state,
    villages: [],
  })
})

export default login