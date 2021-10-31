import {combineReducers} from 'redux'
import login from "./login"
import item from "./item"
import result from "./result"
import village from "./village"

const rootReducer = combineReducers({
  login,
  item,
  result,
  village
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>