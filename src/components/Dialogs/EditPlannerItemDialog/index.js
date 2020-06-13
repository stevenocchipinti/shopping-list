import React, { useRef, useEffect, useState } from "react"
import {
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core"

import { Delete as DeleteIcon } from "@material-ui/icons"

import { useAppState } from "../../Backend"
import DayPicker from "../DayPicker"
import Dialog from "../Dialog"
import {
  ItemOrRecipeAutocomplete,
  IngredientAutocomplete,
} from "../../Autocomplete"
import { unslugify, slugify } from "../../../helpers"
import styled from "styled-components"

const DialogTitle = styled(MuiDialogTitle)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px 8px 24px;
  }
`

const EditPlannerItemDialog = ({
  item: itemToEdit,
  days,
  open,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const { recipes, catalogue } = useAppState()
  const [item, setItem] = useState("")
  const [emoji, setEmoji] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [day, setDay] = useState(days[0])

  const itemInputRef = useRef()

  useEffect(() => {
    const { name, day, type } = itemToEdit
    const emoji =
      type === "recipe" ? recipes[name]?.emoji : catalogue[name]?.emoji
    const ingredients = recipes[name]?.ingredients?.map(i => unslugify(i.slug))
    setItem(unslugify(name))
    setIngredients((type === "recipe" && ingredients) || [])
    setEmoji(emoji)
    setDay(day)
  }, [itemToEdit, recipes, catalogue])

  // TODO: This got tricky, probably should disabled the button if there are no changes
  // const plannedItems = planner[day]?.items || []
  // const alreadyPlanned = plannedItems.some(i => i.name === slugify(item))
  const disabled = slugify(item) === ""

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      item: itemToEdit,
      newItem: item,
      newDay: day,
      newEmoji: emoji,
      newIngredients: ingredients,
    })
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
        <DayPicker days={days} value={day} onChange={setDay} />
        <ItemOrRecipeAutocomplete
          emoji={emoji}
          onEmojiChange={setEmoji}
          value={item}
          onChange={setItem}
          ref={itemInputRef}
          autoFocus
        />
        <IngredientAutocomplete value={ingredients} onChange={setIngredients} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPlannerItemDialog
