import React, { useRef, useState } from "react"
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core"
import Alert from "../../Alert"
import DayPicker from "../DayPicker"
import Dialog from "../Dialog"
import {
  ItemOrRecipeAutocomplete,
  IngredientAutocomplete,
} from "../../Autocomplete"
import { slugify, unslugify } from "../../../helpers"
import styled from "styled-components"
import { useAppState } from "../../Backend"

const Spacer = styled.div`
  flex-grow: 1;
`

const AddPlannerItemDialog = ({
  day,
  days,
  open,
  onSubmit,
  onClose,
  onChangeDay,
}) => {
  const { recipes, planner } = useAppState()
  const [item, setItem] = useState("")
  const [emoji, setEmoji] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [alertVisible, setAlertVisible] = useState(false)

  const itemInputRef = useRef()

  const plannedItems = planner[day]?.items || []
  const alreadyPlanned = plannedItems.some(i => i.name === slugify(item))
  const disabled = slugify(item) === "" || alreadyPlanned

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      day,
      name: item,
      ingredients,
      emoji,
    })
    setAlertVisible(true)
    setTimeout(() => setAlertVisible(false), 1000)
    setItem("")
    setEmoji(null)
    setIngredients([])
    itemInputRef.current.focus()
  }

  const updateItem = newItem => {
    setItem(newItem)
    const recipe = recipes[slugify(newItem)]
    if (recipe) setIngredients(recipe.ingredients.map(i => unslugify(i.slug)))
  }

  return (
    <Dialog
      title="Add items"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add items to planner</DialogTitle>
      <DialogContent>
        <DayPicker days={days} value={day} onChange={onChangeDay} />
        <ItemOrRecipeAutocomplete
          emoji={emoji}
          onEmojiChange={setEmoji}
          value={item}
          onChange={updateItem}
          ref={itemInputRef}
          autoFocus
        />
        <IngredientAutocomplete value={ingredients} onChange={setIngredients} />
      </DialogContent>
      <DialogActions>
        <Alert visible={alertVisible}>Saved!</Alert>
        <Spacer />
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
