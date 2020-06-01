import React, { forwardRef } from "react"
import { emojiIndex } from "emoji-mart"

import useSetting from "../../useSetting"
import Autocomplete from "./Autocomplete"
import { useAppState } from "../Backend"
import { unslugify, slugify } from "../../helpers"

const ItemAutocomplete = forwardRef(({ onChange, ...props }, ref) => {
  const [emojiSupport] = useSetting("emojiSupport")
  const { catalogue } = useAppState()
  const allItems = Object.keys(catalogue).map(unslugify)

  const handleChange = newItem => {
    onChange(newItem)

    if (emojiSupport && (props.emoji || props.onEmojiChange)) {
      const catalogueEntry = catalogue[slugify(newItem)]
      const searchTerm = newItem.replace(/i?e?s?$/, "")
      const storedEmoji = catalogueEntry?.emoji
      props.onEmojiChange(
        storedEmoji
          ? storedEmoji
          : emojiIndex.search(searchTerm)?.[0]?.id || null
      )
    }
  }

  /* Having `-search` in the id stops lastpass autocomplete */
  return (
    <Autocomplete
      label="Item"
      id="item-search"
      options={Array.from(new Set(allItems))}
      ref={ref}
      onChange={handleChange}
      {...props}
    />
  )
})

const SectionAutocomplete = forwardRef((props, ref) => {
  const { catalogue } = useAppState()
  const allSections = Object.values(catalogue)
    .map(e => e.section)
    .filter(Boolean)
  return (
    <Autocomplete
      label="Section"
      id="section-search"
      options={Array.from(new Set(allSections))}
      ref={ref}
      {...props}
    />
  )
})

export default Autocomplete
export { ItemAutocomplete, SectionAutocomplete }
