import React, { useRef } from "react"
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core"
import Dialog from "../Dialog"
import { ItemAutocomplete, SectionAutocomplete } from "../../Autocomplete"
import NumberPicker from "../NumberPicker"
import useDialogState from "./useDialogState"
import { prettify } from "../../../helpers"
import { useAppState } from "../../Backend"

const AddItemDialog = ({ open, onSubmit, onClose }) => {
  const { items, catalogue } = useAppState()
  const [dialogState, dispatch] = useDialogState()
  const itemInputRef = useRef()

  const handleSubmit = e => {
    onSubmit({
      item: prettify(dialogState.item),
      section: prettify(dialogState.section),
      quantity: parseInt(dialogState.quantity),
      emoji: dialogState.emoji,
    })
    dispatch({ type: "reset" })
    itemInputRef.current.focus()
    e.preventDefault()
  }

  const updateItem = newItem =>
    dispatch({ type: "item", newItem, items, catalogue })
  const updateSection = newSection =>
    dispatch({ type: "section", newSection, items, catalogue })
  const updateQuantity = newQuantity =>
    dispatch({ type: "quantity", newQuantity, items, catalogue })
  const updateEmoji = newEmoji =>
    dispatch({ type: "emoji", newEmoji, items, catalogue })

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add items</DialogTitle>
      <DialogContent>
        <ItemAutocomplete
          value={dialogState.item}
          onChange={updateItem}
          emoji={dialogState.emoji}
          onEmojiChange={updateEmoji}
          ref={itemInputRef}
          autoFocus
        />
        <SectionAutocomplete
          value={dialogState.section}
          onChange={updateSection}
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
