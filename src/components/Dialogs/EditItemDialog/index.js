import React, { useEffect } from "react"
import styled from "styled-components"
import {
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core"
import { Delete as DeleteIcon } from "@material-ui/icons"

import Dialog from "../Dialog"
import { ItemAutocomplete, SectionAutocomplete } from "../../Autocomplete"
import NumberPicker from "../NumberPicker"
import { prettify } from "../../../helpers"
import { useDialogState } from "./useDialogState"
import { useAppState } from "../../Backend"

const DialogTitle = styled(MuiDialogTitle)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px 8px 24px;
  }
`

const EditItemDialog = ({ item, open, onSubmit, onDelete, onClose }) => {
  const { items, catalogue } = useAppState()
  const [dialogState, dispatch] = useDialogState()

  useEffect(() => {
    item && dispatch({ type: "set", item, items, catalogue })
  }, [dispatch, item, items, catalogue, open])

  const handleDelete = e => {
    e.preventDefault()
    onDelete(item)
    onClose()
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      item,
      newItem: prettify(dialogState.item),
      newSection: prettify(dialogState.section),
      newQuantity: parseInt(dialogState.quantity),
      newEmoji: dialogState.emoji,
    })
    onClose()
  }

  const updateItem = newItem =>
    dispatch({ type: "item", newItem, item, items, catalogue })
  const updateSection = newSection =>
    dispatch({ type: "section", newSection, item, items, catalogue })
  const updateQuantity = newQuantity =>
    dispatch({ type: "quantity", newQuantity, item, items, catalogue })
  const updateEmoji = newEmoji =>
    dispatch({ type: "emoji", newEmoji, item, items, catalogue })

  return (
    <Dialog
      title="Edit item"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle disableTypography>
        <Typography component="h2" variant="h6">
          Edit item
        </Typography>
        <IconButton
          onClick={handleDelete}
          color="inherit"
          edge="start"
          aria-label="menu"
        >
          <DeleteIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ItemAutocomplete
          value={dialogState.item}
          onChange={updateItem}
          emoji={dialogState.emoji}
          onEmojiChange={updateEmoji}
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

export default EditItemDialog
