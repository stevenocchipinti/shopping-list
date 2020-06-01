import React, { forwardRef } from "react"
import Autocomplete from "./Autocomplete"
import { useAppState } from "../Backend"
import { unslugify } from "../../helpers"

const ItemAutocomplete = forwardRef((props, ref) => {
  const { catalogue } = useAppState()
  const allItems = Object.keys(catalogue).map(unslugify)
  return (
    <Autocomplete
      label="Item"
      id="item-search"
      options={Array.from(new Set(allItems))}
      ref={ref}
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
