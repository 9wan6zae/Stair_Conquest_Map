import { createReducer } from 'typesafe-actions'
import { LoginAction, LoginState } from './types'
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './actions'

const initState: LoginState = {
  loginSuccess: false,
  loginError: false
}

const login = createReducer<LoginState, LoginAction>(initState, {
  [LOGIN_USER]: state => ({
    ...state,
    loginSuccess: false,
    loginError: false
  }),
  [LOGIN_USER_SUCCESS]: (state, action) => ({
    ...state,
    loginSuccess: action.payload,
    loginError: false
  }),
  [LOGIN_USER_ERROR]: state => ({
    ...state,
    loginSuccess: false,
    loginError: true
  })
})

export default login