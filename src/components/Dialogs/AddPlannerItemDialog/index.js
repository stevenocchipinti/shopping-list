import React, { useRef, useState } from "react"
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
  day,
  days,
  planner,
  catalogue,
  open,
  onSubmit,
  onCatalogueDelete,
  onClose,
  onChangeDay,
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
  const handleDeleteSuggestedItem = item => onCatalogueDelete(slugify(item))

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add items to planner</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-day-label">Day</InputLabel>
          <Select
            labelId="select-day-label"
            id="select-day"
            value={day || days[0]}
            onChange={e => onChangeDay(e.target.value)}
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
          onDelete={handleDeleteSuggestedItem}
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
