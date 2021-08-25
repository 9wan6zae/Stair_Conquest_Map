import {combineReducers} from 'redux'
import login from "./login"
import item from "./item"

const rootReducer = combineReducers({
  login,
  item
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>