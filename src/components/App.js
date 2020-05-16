import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Switch, Link, Route, useLocation, useParams } from "react-router-dom"

import IconButton from "@material-ui/core/IconButton"
import FloatingActionButton from "@material-ui/core/Fab"
import MuiBottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import ListIcon from "@material-ui/icons/ShoppingCart"
import ContentAddIcon from "@material-ui/icons/Add"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import PlannerIcon from "@material-ui/icons/Event"
import SweepIcon from "@material-ui/icons/DeleteSweep"

import Catalogue from "./Catalogue"
import Backend from "../backend"
import AppBar from "./AppBar"
import ShoppingLists from "./ShoppingLists"
import Planner from "./Planner"
import { AddItemDialog } from "./ItemDialog"

const BottomNavigation = styled(MuiBottomNavigation)`
  && {
    position: fixed;
    bottom: 0;
    z-index: 0;
    width: 100%;
    justify-content: space-around;
  }
`

const FAB = styled(FloatingActionButton)`
  && {
    position: fixed;
    bottom: 28px;
    right: 0;
    left: 0;
    margin: 0 auto;
    z-index: 1;
  }
`

const App = ({ match }) => {
  const backend = useRef()

  const [items, setItems] = useState([])
  const [catalogue, setCatalogue] = useState({})
  const [loading, setLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const { pathname } = useLocation()
  const { listId } = useParams()
  const tabUrls = [`/list/${listId}`, `/list/${listId}/planner`]

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
    <Switch>
      <Route path={`${match.path}/catalogue`}>
        <AppBar loading={loading} title="History" />

        <Catalogue
          catalogue={catalogue}
          onDelete={item => backend.current.handleCatalogueDelete(item)}
          loading={loading}
        />
      </Route>

      <Route path={match.path}>
        <Route exact path={match.path}>
          <AppBar
            variant="main"
            actions={
              <IconButton
                onClick={() => backend.current.handleSweep()}
                color="inherit"
                edge="end"
                aria-label="Sweep"
              >
                <SweepIcon />
              </IconButton>
            }
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
        </Route>

        <Route path={`${match.path}/planner`}>
          <AppBar
            title="Weekly planner"
            variant="main"
            loading={loading}
            actions={
              <IconButton color="inherit" edge="end" aria-label="Clear">
                <SweepIcon />
              </IconButton>
            }
          />

          <Planner catalogue={catalogue} loading={loading} />

          <FAB color="primary" tabIndex={1}>
            <AddShoppingCartIcon />
          </FAB>
        </Route>

        <BottomNavigation
          value={tabUrls.findIndex(url => pathname === url)}
          showLabels
        >
          <BottomNavigationAction
            label="List"
            icon={<ListIcon />}
            component={Link}
            to={tabUrls[0]}
          />
          <BottomNavigationAction
            label="Planner"
            icon={<PlannerIcon />}
            component={Link}
            to={tabUrls[1]}
          />
        </BottomNavigation>

        <AddItemDialog
          open={addDialogOpen}
          onSubmit={entry => backend.current.handleAdd(entry)}
          onClose={() => setAddDialogOpen(false)}
          items={items}
          catalogue={catalogue}
        />
      </Route>
    </Switch>
  )
}
export default App
