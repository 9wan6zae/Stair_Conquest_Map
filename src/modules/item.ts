import { Item } from "../types/SearchPlaces"

const SET = 'item/SET' as const
const DELETE = 'item/DELETE' as const

export const set_item = (item: Item) => ({
  type: SET,
  selectedItem: item
})

export const delete_item = () => ({
  type: DELETE
})

type ItemAction =
  | ReturnType<typeof set_item>
  | ReturnType<typeof delete_item>

type ItemState = {
  item: Item | undefined
}

const initState: ItemState = {
  item: undefined
}

function counter(state: ItemState = initState, action: ItemAction): ItemState {
  switch(action.type) {
    case SET:
      return {item: action.selectedItem}
    case DELETE:
      return {item: undefined}
    default:
      return state
  }
}

export default counter