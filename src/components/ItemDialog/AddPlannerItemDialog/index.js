import React, { useRef, useState } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"

import Dialog from "../Dialog"
import AutoComplete from "../AutoComplete"
import { unslugify, slugify } from "../../../helpers"

const AddPlannerItemDialog = ({
  day,
  planner,
  catalogue,
  open,
  onSubmit,
  onClose,
}) => {
  const itemInputRef = useRef()
  const [item, setItem] = useState("")

  const allItems = Object.keys(catalogue).map(unslugify)
  const plannedItems = planner[day]?.items || []
  const alreadyPlanned = plannedItems.some(i => i === slugify(item))
  const disabled = slugify(item) === "" || alreadyPlanned

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ item: slugify(item), day })
    setItem("")
    itemInputRef.current.focus()
  }

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add items to {day}</DialogTitle>
      <DialogContent>
        {/* Having `-search` in the id stops lastpass autocomplete */}
        <AutoComplete
          label="Item"
          id="item-search"
          options={Array.from(new Set(allItems))}
          onChange={setItem}
          value={item}
          ref={itemInputRef}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          {alreadyPlanned ? "Already exists!" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPlannerItemDialog
