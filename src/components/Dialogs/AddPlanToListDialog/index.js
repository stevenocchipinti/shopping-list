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

  // Returns: ["apples", "apples", "bananas"]
  const plannedItemSlugs = Object.values(planner)
    .map(p => p.items)
    .flat()

  // Returns: {"apples": 2, "bananas": 1}
  const qtyBySlug = plannedItemSlugs.reduce(
    (result, slug) => ({
      ...result,
      [slug]: (result[slug] || 0) + 1,
    }),
    {}
  )

  const plannedItems = [...new Set(plannedItemSlugs)].map(slug => {
    const name = unslugify(slug)
    const existingItem = items.find(item => item.name === name)
    const existingQty =
      existingItem && !existingItem?.done ? existingItem?.quantity || 1 : 0
    const qtyToAdd = qtyBySlug[slug] || 1
    return {
      name,
      section: catalogue[slug]?.section || "",
      quantity: existingQty + qtyToAdd,
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
        <Button onClick={onClose}>Close</Button>
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
