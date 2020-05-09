import { useReducer } from "react"
import { slugify } from "../../helpers"

const defaultState = {
  item: "",
  section: "",
  quantity: 1,
  itemError: "",
  actionLabel: "Add",
  actionDisabled: true,
}

const addReducer = (
  state,
  { type, items, catalogue, newItem, newSection, newQuantity }
) => {
  if (type === "reset") return defaultState

  let newState = {
    ...defaultState,
    item: type === "item" ? newItem : state.item,
    section: type === "section" ? newSection : state.section,
    quantity: type === "quantity" ? newQuantity : state.quantity,
  }

  const itemOnList = items.find(i => i.name === newState.item)
  const catalogueEntry = catalogue[slugify(newState.item)]
  const storedSection = catalogueEntry && catalogueEntry.section
  const storedQuantity = itemOnList?.quantity

  if (newState.item.trim().length > 0) newState.actionDisabled = false
  if (newItem && storedSection) newState.section = storedSection
  if (newItem && storedQuantity) newState.quantity = storedQuantity

  if (itemOnList && newState.section !== storedSection) {
    newState.actionLabel = "Move"
  } else if (
    itemOnList &&
    newState.section === storedSection &&
    newState.quantity === (storedQuantity || 1)
  ) {
    if (itemOnList.done) {
      newState.actionLabel = "Uncheck"
      newState.actionDisabled = false
    } else {
      newState.actionLabel = "Already exists!"
      newState.actionDisabled = true
    }
  } else if (itemOnList && storedQuantity !== newState?.quantity) {
    newState.actionLabel = "Update"
  }

  return newState
}

// The "type" will eventually be passed to the reducer to differentiate between
// "add" and "edit"
const useDialogState = type => useReducer(addReducer, defaultState)

export default useDialogState
