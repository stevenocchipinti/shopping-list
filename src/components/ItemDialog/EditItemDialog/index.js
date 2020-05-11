import React, { useEffect } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"

import Dialog from "../Dialog"
import AutoComplete from "../AutoComplete"
import NumberPicker from "../NumberPicker"
import { unslugify, prettify } from "../../../helpers"
import { useDialogState } from "./useDialogState"

const EditItemDialog = ({
  item,
  items,
  catalogue,
  open,
  onSubmit,
  onClose,
}) => {
  const [dialogState, dispatch] = useDialogState()

  useEffect(() => {
    item && dispatch({ type: "set", item, items, catalogue })
  }, [dispatch, item, items, catalogue, open])

  const handleSubmit = e => {
    onSubmit({
      item,
      newItem: prettify(dialogState.item),
      newSection: prettify(dialogState.section),
      newQuantity: parseInt(dialogState.quantity),
    })
    onClose()
    e.preventDefault()
  }

  const allItems = Object.keys(catalogue).map(unslugify)
  const allSections = Object.values(catalogue)
    .map(e => e.section)
    .filter(Boolean)

  const updateItem = newItem =>
    dispatch({ type: "item", newItem, item, items, catalogue })
  const updateSection = newSection =>
    dispatch({ type: "section", newSection, item, items, catalogue })
  const updateQuantity = newQuantity =>
    dispatch({ type: "quantity", newQuantity, item, items, catalogue })

  return (
    <Dialog
      title="Edit item"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Edit item</DialogTitle>
      <DialogContent>
        {/* Having `-search` in the id stops lastpass autocomplete */}
        <AutoComplete
          label="Item"
          id="item-search"
          options={Array.from(new Set(allItems))}
          onChange={updateItem}
          value={dialogState.item}
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

export default EditItemDialog
