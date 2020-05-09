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

import useDialogState from "./useDialogState"
import AutoComplete from "./AutoComplete"
import NumberPicker from "./NumberPicker"
import { unslugify, prettify } from "../../helpers"

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

const NewItemDialog = ({ items, catalogue, onSubmit }) => {
  const [open, setOpen] = useState(false)
  const [dialogState, dispatch] = useDialogState("add")
  const itemInputRef = useRef()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleOpen = () => {
    dispatch({ type: "reset" })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = e => {
    onSubmit({
      item: prettify(dialogState.item),
      section: prettify(dialogState.section),
      quantity: parseInt(dialogState.quantity),
    })
    dispatch({ type: "reset" })
    itemInputRef.current.focus()
    e.preventDefault()
  }

  const allItems = Object.keys(catalogue).map(unslugify)
  const allSections = Object.values(catalogue)
    .map(e => e.section)
    .filter(Boolean)

  const updateItem = newItem =>
    dispatch({ type: "item", newItem, items, catalogue })
  const updateSection = newSection =>
    dispatch({ type: "section", newSection, items, catalogue })
  const updateQuantity = newQuantity =>
    dispatch({ type: "quantity", newQuantity, items, catalogue })

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
        <Form onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle>Add items</DialogTitle>
          <DialogContent>
            {/* Having `-search` in the id stops lastpass autocomplete */}
            <AutoComplete
              label="Item"
              id="item-search"
              options={Array.from(new Set(allItems))}
              onChange={updateItem}
              value={dialogState.item}
              ref={itemInputRef}
              autoFocus
            />
            <AutoComplete
              label="Section"
              id="section-search"
              options={Array.from(new Set(allSections))}
              onChange={updateSection}
              value={dialogState.section}
            />
            <NumberPicker
              value={dialogState.quantity}
              onChange={updateQuantity}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={dialogState.actionDisabled}
            >
              {dialogState.actionLabel}
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  )
}

export default NewItemDialog
