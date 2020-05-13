import { useReducer } from "react"
import { slugify, prettify } from "../../../helpers"

export const defaultState = {
  item: "",
  section: "",
  quantity: 1,
  actionLabel: "Save",
  actionDisabled: false,
}

export const reducer = (state, event) => {
  const {
    type,
    item,
    items,
    catalogue,
    newItem,
    newSection,
    newQuantity,
  } = event

  const originalName = item.name
  const originalSection = catalogue[slugify(item.name)]?.section
  const originalQuantity = item.quantity

  if (type === "reset") return defaultState
  if (type === "set") {
    return {
      ...defaultState,
      item: originalName,
      section: originalSection,
      quantity: originalQuantity,
      actionDisabled: true,
    }
  }

  let newState = {
    ...state,
    item: type === "item" ? newItem : state.item,
    section: type === "section" ? newSection : state.section,
    quantity: type === "quantity" ? newQuantity : state.quantity,
  }

  const noChanges =
    prettify(newState.item) === prettify(originalName) &&
    prettify(newState.section) === prettify(originalSection) &&
    newState.quantity === originalQuantity

  const alreadyExists =
    prettify(newState.item) !== prettify(originalName) &&
    items.some(item => prettify(item.name) === prettify(newState.item))

  if (alreadyExists) {
    newState.actionLabel = "Already exists!"
    newState.actionDisabled = true
  } else {
    newState.actionLabel = defaultState.actionLabel
    newState.actionDisabled = noChanges
  }

  return newState
}

export const useDialogState = () => useReducer(reducer, defaultState)
