import React, { useState, useRef } from "react"
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@material-ui/core"
import { InsertEmoticon as InsertEmoticonIcon } from "@material-ui/icons"

import { Emoji } from "emoji-mart"

import EmojiPicker from "../../EmojiPicker"
import Dialog from "../Dialog"
import AutoComplete from "../AutoComplete"
import NumberPicker from "../NumberPicker"
import useDialogState from "./useDialogState"
import { unslugify, prettify } from "../../../helpers"
import useSetting from "../../../useSetting"
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
  const updateEmoji = newEmoji =>
    dispatch({ type: "emoji", newEmoji, items, catalogue })

  const emojiPickerRef = useRef()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const emojiPickerOpen = Boolean(anchorEl)

  const [emojiSupport] = useSetting("emojiSupport")
  const emojiProps = !emojiSupport
    ? {}
    : {
        InputProps: {
          style: { padding: 4 },
          startAdornment: (
            <IconButton ref={emojiPickerRef} onClick={handleClick}>
              {dialogState.emoji ? (
                <Emoji emoji={dialogState.emoji} set="apple" size={24} />
              ) : (
                <InsertEmoticonIcon />
              )}
            </IconButton>
          ),
        },
      }

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add items</DialogTitle>
      <DialogContent>
        {emojiSupport && (
          <EmojiPicker
            onSelect={updateEmoji}
            open={emojiPickerOpen}
            anchorEl={emojiPickerRef.current}
            onClose={handleClose}
          />
        )}

        <AutoComplete
          label="Item"
          id="item-search"
          options={Array.from(new Set(allItems))}
          onChange={updateItem}
          value={dialogState.item}
          ref={itemInputRef}
          autoFocus
          {...emojiProps}
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
