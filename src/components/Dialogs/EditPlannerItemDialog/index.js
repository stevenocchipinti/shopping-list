import React, { useRef, useEffect, useState } from "react"
import {
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Button,
  FormControl as MuiFormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core"

import { Delete as DeleteIcon } from "@material-ui/icons"

import { useAppState } from "../../Backend"
import Dialog from "../Dialog"
import AutoComplete from "../../Autocomplete"
import { unslugify, slugify } from "../../../helpers"
import styled from "styled-components"

const FormControl = styled(MuiFormControl)`
  && {
    margin-bottom: 2rem;
  }
`

const DialogTitle = styled(MuiDialogTitle)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px 8px 24px;
  }
`

const AddPlannerItemDialog = ({
  item: itemToEdit,
  days,
  open,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const { planner, catalogue } = useAppState()

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
