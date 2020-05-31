import { useReducer } from "react"
import { slugify } from "../../../helpers"
import { emojiIndex } from "emoji-mart"

export const defaultState = {
  item: "",
  section: "",
  quantity: 1,
  emoji: null,
  actionLabel: "Add",
  actionDisabled: true,
}

export const reducer = (
  state,
  { type, items, catalogue, newItem, newSection, newQuantity, newEmoji }
) => {
  if (type === "reset") return defaultState

  let newState = {
    ...defaultState,
    item: type === "item" ? newItem : state.item,
    section: type === "section" ? newSection : state.section,
    quantity: type === "quantity" ? newQuantity : state.quantity,
    emoji: type === "emoji" ? newEmoji : state.emoji,
  }

  const itemOnList = items.find(i => i.name === newState.item)
  const catalogueEntry = catalogue[slugify(newState.item)]
  const storedSection = catalogueEntry && catalogueEntry.section
  const storedQuantity = itemOnList?.quantity
  const storedEmoji = catalogueEntry?.emoji

  if (type === "item") {
    const searchTerm = (newState.emoji = newItem.replace(/i?e?s?$/, ""))
    newState.emoji = storedEmoji
      ? storedEmoji
      : emojiIndex.search(searchTerm)?.[0]?.id || null
  }

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

export default () => useReducer(reducer, defaultState)
