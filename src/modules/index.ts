import {combineReducers} from 'redux'
import login from "./login"
import item from "./item"
import result from "./result"

const rootReducer = combineReducers({
  login,
  item,
  result
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>