import React, { useState, useRef, forwardRef } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import FAB from "@material-ui/core/FAB"
import Slide from "@material-ui/core/Slide"
import ContentAddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import AutoComplete from "./AutoComplete"
import { slugify, format, capitalize } from "../helpers"

const styles = {
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1,
  },
}

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const NewItemDialog = props => {
  const defaultState = {
    item: "",
    section: "",
    itemError: "",
    actionLabel: "Add",
    actionDisabled: true,
  }

  const [open, setOpen] = useState(false)
  const [state, setState] = useState(defaultState)
  const itemInputRef = useRef()

  const handleOpen = () => {
    setState(defaultState)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    props.onSubmit({
      item: format(state.item),
      section: format(state.section),
    })
    setState(defaultState)
    itemInputRef.current.focus()
  }

  const update = changes => {
    let newState = {
      ...defaultState,
      item: state.item,
      section: state.section,
      ...changes,
    }

    const itemOnList = props.items.find(i => i.name === newState.item)
    const catalogueEntry = props.catalogue[slugify(newState.item)]
    const storedSection = catalogueEntry && catalogueEntry.section

    if (newState.item.trim().length > 0) {
      newState.actionDisabled = false
    }
    if (changes.item && storedSection) {
      newState.section = storedSection
    }

    if (itemOnList && newState.section !== storedSection) {
      newState.actionLabel = "Move"
    } else if (itemOnList && newState.section === storedSection) {
      if (itemOnList.done) {
        newState.actionLabel = "Uncheck"
        newState.actionDisabled = false
      } else {
        newState.actionLabel = "Already exists!"
        newState.actionDisabled = true
      }
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
      <FAB
        onClick={() => handleOpen()}
        style={styles.floatingButton}
        color="primary"
        tabIndex={1}
      >
        <ContentAddIcon />
      </FAB>

      <Dialog
        fullScreen
        TransitionComponent={Transition}
        title="Add Items"
        open={open}
        onClose={() => handleClose()}
      >
        <DialogTitle>Add items</DialogTitle>
        <DialogContent>
          <AutoComplete
            label="Item"
            options={Array.from(new Set(allItems))}
            onChange={value => update({ item: value })}
            value={state.item}
            ref={itemInputRef}
            autoFocus
          />
          <AutoComplete
            label="Section"
            options={Array.from(new Set(allSections))}
            onChange={value => update({ section: value })}
            value={state.section}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={state.actionDisabled}
            onClick={() => handleSubmit()}
          >
            {state.actionLabel}
          </Button>
          <Button onClick={() => handleClose()}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewItemDialog
