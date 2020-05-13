import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Switch, Link, Route } from "react-router-dom"

import FloatingActionButton from "@material-ui/core/Fab"
import ContentAddIcon from "@material-ui/icons/Add"
import MuiAppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import BackIcon from "@material-ui/icons/ArrowBack"
import Typography from "@material-ui/core/Typography"

import Catalogue from "./Catalogue"
import Backend from "../backend"
import AppBar from "./AppBar"
import ShoppingLists from "./ShoppingLists"
import { AddItemDialog } from "./ItemDialog"

const FAB = styled(FloatingActionButton)`
  && {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }
`

const App = ({ match }) => {
  const backend = useRef()

  const [items, setItems] = useState([])
  const [catalogue, setCatalogue] = useState({})
  const [loading, setLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("listName", match.params.listId)
    backend.current = new Backend(match.params.listId, {
      onItemsChanged: items => {
        setItems(items)
        setLoading(false)
      },
      onCatalogueChanged: catalogue => {
        setCatalogue(catalogue)
        setLoading(false)
      },
    })
  }, [match.params.listId])

  return (
    <>
      <Switch>
        <Route path={`${match.path}/catalogue`}>
          {/* TODO: Reuse AppBar to get loading state */}
          <MuiAppBar position="static">
            <Toolbar>
              <IconButton
                component={Link}
                to={`/list/${match.params.listId}`}
                color="inherit"
                edge="start"
                aria-label="back"
              >
                <BackIcon />
              </IconButton>
              <Typography style={{ flexGrow: 1 }} variant="h6" component="h1">
                History
              </Typography>
            </Toolbar>
          </MuiAppBar>
          <Catalogue
            catalogue={catalogue}
            onDelete={item => backend.current.handleCatalogueDelete(item)}
            loading={loading}
          />
        </Route>

        <Route path={match.path}>
          <AppBar
            sweepItems={() => backend.current.handleSweep()}
            loading={loading}
          />

          <ShoppingLists
            items={items}
            catalogue={catalogue}
            onMark={item => backend.current.handleMark(item)}
            onEdit={entry => backend.current.handleEdit(entry)}
            loading={loading}
          />

          <FAB
            onClick={() => setAddDialogOpen(true)}
            color="primary"
            tabIndex={1}
          >
            <ContentAddIcon />
          </FAB>

          <AddItemDialog
            open={addDialogOpen}
            onSubmit={entry => backend.current.handleAdd(entry)}
            onClose={() => setAddDialogOpen(false)}
            items={items}
            catalogue={catalogue}
          />
        </Route>
      </Switch>
    </>
  )
}
export default App
