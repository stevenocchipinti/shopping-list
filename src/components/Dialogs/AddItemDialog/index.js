import React, { useRef } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"

import Dialog from "../Dialog"
import AutoComplete from "../AutoComplete"
import NumberPicker from "../NumberPicker"
import useDialogState from "./useDialogState"
import { unslugify, prettify } from "../../../helpers"

const AddItemDialog = ({ items, catalogue, open, onSubmit, onClose }) => {
  const [dialogState, dispatch] = useDialogState()
  const itemInputRef = useRef()

  const handleSubmit = e => {
    onSubmit({
      item: prettify(dialogState.item),
      section: prettify(dialogState.section),
      quantity: parseInt(dialogState.quantity),
    })
    dispatch({ type: "reset" })
    itemInputRef.current.focus()
    e.preventDefault()
  }

  const allItems = Object.keys(catalogue).map(unslugify)
  const allSections = Object.values(catalogue)
    .map(e => e.section)
    .filter(Boolean)

  const updateItem = newItem =>
    dispatch({ type: "item", newItem, items, catalogue })
  const updateSection = newSection =>
    dispatch({ type: "section", newSection, items, catalogue })
  const updateQuantity = newQuantity =>
    dispatch({ type: "quantity", newQuantity, items, catalogue })

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add items</DialogTitle>
      <DialogContent>
        {/* Having `-search` in the id stops lastpass autocomplete */}
        <AutoComplete
          label="Item"
          id="item-search"
          options={Array.from(new Set(allItems))}
          onChange={updateItem}
          value={dialogState.item}
          ref={itemInputRef}
          autoFocus
        />
        <AutoComplete
          label="Section"
          id="section-search"
          options={Array.from(new Set(allSections))}
          onChange={updateSection}
          value={dialogState.section}
        />
        <NumberPicker value={dialogState.quantity} onChange={updateQuantity} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={dialogState.actionDisabled}
        >
          {dialogState.actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddItemDialog
