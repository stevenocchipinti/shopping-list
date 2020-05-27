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
  catalogue,
  open,
  onSubmit,
  onClose,
}) => {
  const [ignoredItems, setIgnoredItems] = useState([])
  const plannedItems = Object.values(planner)
    .map(p => p.items)
    .flat()
    .map(n => ({
      name: unslugify(n),
      done: ignoredItems.includes(unslugify(n)),
    }))

  const handleMark = ({ name }) =>
    setIgnoredItems(
      ignoredItems.includes(name)
        ? ignoredItems.filter(i => i !== name)
        : [...ignoredItems, name]
    )

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(plannedItems.filter(i => !i.done).map(({ name }) => name))
  }

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
          disabled={plannedItems.length === 0}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPlanToListDialog
