import React, { useState, useRef, forwardRef } from "react"
import styled from "styled-components"
import MuiDialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import FloatingActionButton from "@material-ui/core/Fab"
import Slide from "@material-ui/core/Slide"
import ContentAddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"

import AutoComplete from "./AutoComplete"
import NumberPicker from "./NumberPicker"
import { slugify, format, capitalize } from "../../helpers"

const Dialog = styled(MuiDialog)`
  & .MuiDialog-paper:not(.MuiDialog-paperFullScreen) {
    min-width: 400px;
  }
`

const FAB = styled(FloatingActionButton)`
  && {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }
`

// The form is nessesary to get the mobile keyboards to tab through the
// fields and the styling is needed because the DialogTitle, DialogContent,
// DialogActions, etc. are expected to be flex children of the Dialog
// component but now they are children of the form element
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const NewItemDialog = props => {
  const defaultState = {
    item: "",
    section: "",
    quantity: 1,
    itemError: "",
    actionLabel: "Add",
    actionDisabled: true,
  }

  const [open, setOpen] = useState(false)
  const [state, setState] = useState(defaultState)
  const itemInputRef = useRef()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleOpen = () => {
    setState(defaultState)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = e => {
    props.onSubmit({
      item: format(state.item),
      section: format(state.section),
      quantity: parseInt(state.quantity),
    })
    setState(defaultState)
    itemInputRef.current.focus()
    e.preventDefault()
  }

  const update = changes => {
    let newState = {
      ...defaultState,
      item: state.item,
      section: state.section,
      quantity: state.quantity,
      ...changes,
    }

    const itemOnList = props.items.find(i => i.name === newState.item)
    const catalogueEntry = props.catalogue[slugify(newState.item)]
    const storedSection = catalogueEntry && catalogueEntry.section
    const storedQuantity = itemOnList?.quantity

    if (newState.item.trim().length > 0) newState.actionDisabled = false
    if (changes.item && storedSection) newState.section = storedSection
    if (changes.item && storedQuantity) newState.quantity = storedQuantity

    if (itemOnList && newState.section !== storedSection) {
      newState.actionLabel = "Move"
    } else if (
      itemOnList &&
      newState.section === storedSection &&
      newState.quantity === (storedQuantity || 1)
    ) {
      if (itemOnList.done) {
        newState.actionLabel = "Uncheck"
        newState.actionDisabled = false
      } else {
        newState.actionLabel = "Already exists!"
        newState.actionDisabled = true
      }
    } else if (itemOnList && storedQuantity !== newState?.quantity) {
      newState.actionLabel = "Update"
    }
    setState(newState)
  }

  const catalogueEntries = Object.values(props.catalogue)
  const allItems = Object.keys(props.catalogue).map(item =>
    item.split("-").map(capitalize).join(" ")
  )
  const allSections = catalogueEntries.map(e => e.section).filter(x => x)

  return (
    <div>
      <FAB onClick={handleOpen} color="primary" tabIndex={1}>
        <ContentAddIcon />
      </FAB>

      <Dialog
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        title="Add Items"
        open={open}
        onClose={handleClose}
      >
        <Form
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <DialogTitle>Add items</DialogTitle>
          <DialogContent>
            {/* Having `-search` in the id stops lastpass autocomplete */}
            <AutoComplete
              label="Item"
              id="item-search"
              options={Array.from(new Set(allItems))}
              onChange={item => update({ item })}
              value={state.item}
              ref={itemInputRef}
              autoFocus
            />
            <AutoComplete
              label="Section"
              id="section-search"
              options={Array.from(new Set(allSections))}
              onChange={section => update({ section })}
              value={state.section}
            />
            <NumberPicker
              value={state.quantity}
              onChange={quantity => update({ quantity })}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={state.actionDisabled}
            >
              {state.actionLabel}
            </Button>
            <Button onClick={handleClose}>Done</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  )
}

export default NewItemDialog
