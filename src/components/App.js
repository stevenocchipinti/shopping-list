import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import {
  Switch,
  Link,
  Route,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom"

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
import { AddItemDialog, AddPlanToListDialog } from "./ItemDialog"
import { greys } from "../helpers"

const BottomNavigation = styled(MuiBottomNavigation)`
  && {
    position: fixed;
    bottom: 0;
    z-index: 0;
    width: 100%;
    justify-content: space-around;
    border-top: 1px solid ${({ theme }) => theme.palette.divider};
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
  &&:disabled {
    background-color: ${greys("300", "900")};
  }
`

const App = ({ match }) => {
  const backend = useRef()

  const [items, setItems] = useState([])
  const [catalogue, setCatalogue] = useState({})
  const [planner, setPlanner] = useState({})
  const [loading, setLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addPlanToListDialogOpen, setAddPlanToListDialogOpen] = useState(false)

  const { pathname } = useLocation()
  const history = useHistory()
  const { listId } = useParams()
  const tabUrls = [`/list/${listId}`, `/list/${listId}/planner`]

  useEffect(() => {
    window.localStorage.setItem("listName", match.params.listId)
    backend.current = new Backend(match.params.listId, {
      onItemsChanged: items => setItems(items),
      onCatalogueChanged: catalogue => setCatalogue(catalogue),
      onPlannerChanged: planner => setPlanner(planner),
      onLoadingChanged: loading => setLoading(loading),
    })
    return () => backend.disconnect()
  }, [match.params.listId])

  const hasSomeTickedItems = items.some(item => item.done)
  const hasSomePlannedItems = Object.values(planner).some(
    day => day?.items?.length > 0
  )

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
              hasSomeTickedItems && (
                <IconButton
                  onClick={() => backend.current.handleSweep()}
                  color="inherit"
                  edge="end"
                  aria-label="Sweep"
                >
                  <SweepIcon />
                </IconButton>
              )
            }
            loading={loading}
          />
          <ShoppingLists
            items={items}
            catalogue={catalogue}
            onMark={item => backend.current.handleMark(item)}
            onEdit={entry => backend.current.handleEdit(entry)}
            onDelete={entry => backend.current.handleDelete(entry)}
            loading={loading}
          />
          <FAB
            disabled={loading}
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

        <Route path={`${match.path}/planner`}>
          <AppBar
            title="Weekly planner"
            variant="main"
            loading={loading}
            actions={
              hasSomePlannedItems && (
                <IconButton
                  onClick={() => backend.current.handleClearPlanner()}
                  color="inherit"
                  edge="end"
                  aria-label="Clear"
                >
                  <SweepIcon />
                </IconButton>
              )
            }
          />
          <Planner
            onAdd={entry => backend.current.handleAddToPlanner(entry)}
            onEdit={entry => backend.current.handleEditPlannerItem(entry)}
            onDelete={entry => backend.current.handleDeleteFromPlanner(entry)}
            planner={planner}
            catalogue={catalogue}
            loading={loading}
          />
          <FAB
            disabled={loading || !hasSomePlannedItems}
            onClick={() => setAddPlanToListDialogOpen(true)}
            color="primary"
            tabIndex={1}
          >
            <AddShoppingCartIcon />
          </FAB>
          <AddPlanToListDialog
            open={addPlanToListDialogOpen}
            onSubmit={entry => {
              backend.current.handleAddPlanToList(entry)
              history.replace(tabUrls[0])
            }}
            onClose={() => setAddPlanToListDialogOpen(false)}
            planner={planner}
            items={items}
            catalogue={catalogue}
          />
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
            replace
          />
          <BottomNavigationAction
            label="Planner"
            icon={<PlannerIcon />}
            component={Link}
            to={tabUrls[1]}
            replace
          />
        </BottomNavigation>
      </Route>
    </Switch>
  )
}
export default App
