import { RegisterAccessibilityResult } from "../types/Accessibility"

const SET = 'result/SET' as const
const DELETE = 'result/DELETE' as const

export const set_result = (result: RegisterAccessibilityResult) => ({
  type: SET,
  result: result
})

export const delete_result = () => ({
  type: DELETE
})

type ResultAction =
  | ReturnType<typeof set_result>
  | ReturnType<typeof delete_result>

type ResultState = {
  result: RegisterAccessibilityResult | undefined
}

const initState: ResultState = {
  result: undefined
}

function result(state: ResultState = initState, action: ResultAction): ResultState {
  switch(action.type) {
    case SET:
      return {result: action.result}
    case DELETE:
      return {result: undefined}
    default:
      return state
  }
}

export default result