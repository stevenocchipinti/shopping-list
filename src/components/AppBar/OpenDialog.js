import React, { useState } from "react"
import styled from "styled-components"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField as MuiTextField,
  Button,
  Typography,
} from "@material-ui/core"
import AutoComplete from "../Autocomplete"

import { Link, useLocation, useHistory } from "react-router-dom"
import useLocalStorage from "../../useLocalStorage"
import { generateListName } from "../../components/Backend/backend"

// The form is nessesary to get the mobile keyboards to tab through the
// fields and the styling is needed because the DialogTitle, DialogContent,
// DialogActions, etc. are expected to be flex children of the Dialog
// component but now they are children of the form element
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  && > * {
    margin-bottom: 1rem;
  }
`

const TextField = styled(MuiTextField)`
  & .MuiInputBase-root {
    height: 42px;
  }
`

const ShareDialog = ({ open, onClose }) => {
  const [listMRU, setListMRU] = useLocalStorage("listMRU", [])
  const [newList, setNewList] = useState("")
  const { pathname } = useLocation()
  const history = useHistory()
  const id = pathname.match(/\/list\/([^/]+)/)[1]

  const addToListMRU = list => setListMRU([...new Set([...listMRU, list])])
  const removeFromListMRU = list => setListMRU(listMRU.filter(l => l !== list))

  const openList = e => {
    e.preventDefault()
    if (newList.length === 0) return
    let list = newList
    try {
      const url = new URL(newList)
      list = url.pathname.match(/\/list\/([^/]+)/)[1]
    } catch (Exception) {}
    addToListMRU(list)
    history.push(`/list/${list}`)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Form onSubmit={openList} autoComplete="off">
        <DialogTitle>Change list</DialogTitle>
        <DialogContent>
          <DialogContentText>Your list ID: {id}</DialogContentText>
          <Actions>
            <p>Open an existing list:</p>

            {/* Having `-search` in the id stops lastpass autocomplete */}
            <AutoComplete
              id="list-search"
              options={listMRU}
              inputValue={newList}
              onInputChange={(e, newValue) => e && setNewList(newValue)}
              onDelete={removeFromListMRU}
              autoFocus
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="ID or URL"
                  autoFocus
                  id="open"
                  fullWidth={true}
                  size="small"
                />
              )}
            />

            <Typography align="center">or</Typography>
            <Button
              component={Link}
              onClick={onClose}
              to={`/list/${generateListName()}`}
              color="primary"
              variant="outlined"
              size="large"
            >
              Create new list
            </Button>
          </Actions>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            disabled={newList.length === 0}
            variant="contained"
            type="submit"
            color="primary"
          >
            Open
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default ShareDialog
