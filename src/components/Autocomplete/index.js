import React, { forwardRef } from "react"

import useSetting from "../../useSetting"
import Autocomplete from "./Autocomplete"
import { useAppState } from "../Backend"
import { unslugify, slugify } from "../../helpers"
import { emojiSearch } from "../Emoji"
import { TextField } from "@material-ui/core"

const ItemAutocomplete = forwardRef(({ onChange, value, ...props }, ref) => {
  const [emojiSupport] = useSetting("emojiSupport")
  const { catalogue } = useAppState()
  const allItems = Object.keys(catalogue).map(unslugify)

  const handleChange = (e, newValue) => {
    if (!e) return false

    onChange(newValue)
    if (emojiSupport && (props.emoji || props.onEmojiChange)) {
      const catalogueEntry = catalogue[slugify(newValue)]
      const searchTerm = newValue.replace(/i?e?s?$/, "")
      const storedEmoji = catalogueEntry?.emoji
      props.onEmojiChange(
        storedEmoji ? storedEmoji : emojiSearch(searchTerm)?.[0]?.id || null
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
      inputValue={value}
      onInputChange={handleChange}
      {...props}
    />
  )
})

const SectionAutocomplete = forwardRef(({ onChange, value, ...props }, ref) => {
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
      inputValue={value}
      onInputChange={(e, newValue) => e && onChange(newValue)}
      {...props}
    />
  )
})

const ItemOrRecipeAutocomplete = forwardRef(
  ({ onChange, value, ...props }, ref) => {
    const [emojiSupport] = useSetting("emojiSupport")
    const { catalogue, recipes } = useAppState()
    const allItems = [
      ...Object.keys(recipes).map(unslugify),
      ...Object.keys(catalogue).map(unslugify),
    ]

    const handleChange = (e, newValue) => {
      if (!e) return false

      onChange(newValue)
      if (emojiSupport && (props.emoji || props.onEmojiChange)) {
        const recipeEntry = recipes[slugify(newValue)]
        const catalogueEntry = catalogue[slugify(newValue)]
        const storedEmoji = recipeEntry?.emoji || catalogueEntry?.emoji
        const searchTerm = newValue.replace(/i?e?s?$/, "")
        props.onEmojiChange(
          storedEmoji ? storedEmoji : emojiSearch(searchTerm)?.[0]?.id || null
        )
      }
    }

    /* Having `-search` in the id stops lastpass autocomplete */
    return (
      <Autocomplete
        label="Item or recipe"
        id="item-or-recipe-search"
        options={Array.from(new Set(allItems))}
        ref={ref}
        inputValue={value}
        onInputChange={handleChange}
        {...props}
      />
    )
  }
)

const IngredientAutocomplete = forwardRef(({ onChange, ...props }, ref) => {
  const { catalogue } = useAppState()
  const allItems = Object.keys(catalogue).map(unslugify)

  /* Having `-search` in the id stops lastpass autocomplete */
  return (
    <Autocomplete
      multiple
      emoji={false}
      label="Ingredients"
      id="ingredient-search"
      options={Array.from(new Set(allItems))}
      ref={ref}
      renderInput={params => (
        <TextField variant="outlined" label="Ingredients" {...params} />
      )}
      onChange={(e, newValue) => e && onChange(newValue)}
      {...props}
    />
  )
})

export default Autocomplete
export {
  ItemAutocomplete,
  SectionAutocomplete,
  ItemOrRecipeAutocomplete,
  IngredientAutocomplete,
}
