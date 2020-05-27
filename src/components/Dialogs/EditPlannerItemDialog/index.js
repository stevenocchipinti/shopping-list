import React, { useRef, useEffect, useState } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import { default as MuiFormControl } from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

import Dialog from "../Dialog"
import AutoComplete from "../AutoComplete"
import { unslugify, slugify } from "../../../helpers"
import styled from "styled-components"

const FormControl = styled(MuiFormControl)`
  && {
    margin-bottom: 2rem;
  }
`

const AddPlannerItemDialog = ({
  item: itemToEdit,
  days,
  planner,
  catalogue,
  open,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const itemInputRef = useRef()
  const [item, setItem] = useState("")
  const [day, setDay] = useState(days[0])

  useEffect(() => {
    setItem(itemToEdit?.name)
    setDay(itemToEdit?.day)
  }, [itemToEdit])

  const allItems = Object.keys(catalogue).map(unslugify)
  const plannedItems = planner[day]?.items || []
  const alreadyPlanned = plannedItems.some(i => i === slugify(item))
  const disabled = slugify(item) === "" || alreadyPlanned

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ item: itemToEdit, newItem: item, newDay: day })
    onClose()
  }

  const handleDelete = e => {
    e.preventDefault()
    onDelete({ item, day })
    onClose()
  }

  return (
    <Dialog
      title="Edit item"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Edit item</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-day-label">Day</InputLabel>
          <Select
            labelId="select-day-label"
            id="select-day"
            value={day || days[0]}
            onChange={e => setDay(e.target.value)}
            label="Day"
          >
            {days.map(d => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Button onClick={handleDelete}>Delete</Button>
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
