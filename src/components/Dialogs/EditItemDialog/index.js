import React, { useEffect } from "react"
import styled from "styled-components"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"

import Dialog from "../Dialog"
import AutoComplete from "../AutoComplete"
import NumberPicker from "../NumberPicker"
import { slugify, unslugify, prettify } from "../../../helpers"
import { useDialogState } from "./useDialogState"

const DialogTitle = styled(MuiDialogTitle)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px 8px 24px;
  }
`

const EditItemDialog = ({
  item,
  items,
  catalogue,
  open,
  onSubmit,
  onDelete,
  onCatalogueDelete,
  onClose,
}) => {
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
    })
    onClose()
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
  const deleteSuggestedItem = item => onCatalogueDelete(slugify(item))

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
        {/* Having `-search` in the id stops lastpass autocomplete */}
        <AutoComplete
          label="Item"
          id="item-search"
          options={Array.from(new Set(allItems))}
          onChange={updateItem}
          onDelete={deleteSuggestedItem}
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
