import React, { useState } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"

import Dialog from "../Dialog"
import ShoppingLists from "../../ShoppingLists"
import { unslugify } from "../../../helpers"

const AddPlanToListDialog = ({
  planner,
  items,
  catalogue,
  open,
  onSubmit,
  onClose,
}) => {
  const [ignoredItems, setIgnoredItems] = useState([])
  const plannedItems = Object.values(planner)
    .map(p => p.items)
    .flat()
    .map(slug => {
      const name = unslugify(slug)
      const existingItem = items.find(item => item.name === name)
      const existingQty =
        existingItem && !existingItem?.done ? existingItem?.quantity || 1 : 0
      return {
        name,
        section: catalogue[slug]?.section || "",
        quantity: existingQty + 1,
        done: ignoredItems.includes(unslugify(slug)),
      }
    })

  const itemsToAdd = plannedItems
    .filter(i => !i.done)
    .map(({ name, section, quantity }) => ({ name, section, quantity }))

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(itemsToAdd)
    onClose()
  }

  const handleMark = ({ name }) =>
    setIgnoredItems(
      ignoredItems.includes(name)
        ? ignoredItems.filter(i => i !== name)
        : [...ignoredItems, name]
    )

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add planner items to list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can deselect any items you don't want.
        </DialogContentText>
        <ShoppingLists
          variant="embedded"
          items={plannedItems}
          catalogue={catalogue}
          onMark={handleMark}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={itemsToAdd.length === 0}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPlanToListDialog
