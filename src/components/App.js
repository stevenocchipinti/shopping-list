import React, { useState } from "react"
import styled from "styled-components"
import { Switch, Link, Route, useLocation, useHistory } from "react-router-dom"

import {
  IconButton,
  Fab as FloatingActionButton,
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Zoom,
} from "@material-ui/core"

import {
  ShoppingCart as ListIcon,
  Add as ContentAddIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Event as PlannerIcon,
  DeleteSweep as SweepIcon,
} from "@material-ui/icons"

import { useAppState, useBackend } from "./Backend"
import AppBar from "./AppBar"
import ShoppingLists from "./ShoppingLists"
import Catalogue from "./Catalogue"
import Recipes from "./Recipes"
import Recipe from "./Recipe"
import Planner from "./Planner"
import { AddItemDialog, AddPlanToListDialog } from "./Dialogs"
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
  const { pathname } = useLocation()
  const history = useHistory()
  const { listId } = match.params
  const tabUrls = [`/list/${listId}`, `/list/${listId}/planner`]

  const { items, planner, loading } = useAppState()
  const backend = useBackend()

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addPlanToListDialogOpen, setAddPlanToListDialogOpen] = useState(false)

  const hasSomeTickedItems = items.some(item => item.done)
  const hasSomePlannedItems = Object.values(planner).some(
    day => day?.items?.length > 0
  )

  return (
    <Switch>
      <Route path={`${match.path}/catalogue`}>
        <AppBar loading={loading} title="History" />
        <Catalogue onDelete={item => backend.handleCatalogueDelete(item)} />
      </Route>

      <Route
        path={`${match.path}/recipes/:recipeId`}
        render={({ match }) => <Recipe {...match.params} />}
      />

      <Route path={`${match.path}/recipes`}>
        <AppBar loading={loading} title="Recipes" />
        <Recipes />
      </Route>

      <Route path={match.path}>
        <Route exact path={match.path}>
          <AppBar
            variant="main"
            actions={
              <Zoom in={hasSomeTickedItems}>
                <IconButton
                  onClick={() => backend.handleSweep()}
                  color="inherit"
                  edge="end"
                  aria-label="Sweep"
                >
                  <SweepIcon />
                </IconButton>
              </Zoom>
            }
            loading={loading}
          />
          <ShoppingLists
            items={items}
            onMark={item => backend.handleMark(item)}
            onEdit={entry => backend.handleEdit(entry)}
            onDelete={entry => backend.handleDelete(entry)}
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
            onSubmit={entry => backend.handleAdd(entry)}
            onClose={() => setAddDialogOpen(false)}
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
                  onClick={() => backend.handleClearPlanner()}
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
            onAdd={entry => backend.handleAddToPlanner(entry)}
            onEdit={entry => backend.handleEditPlannerItem(entry)}
            onDelete={entry => backend.handleDeleteFromPlanner(entry)}
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
              backend.handleAddPlanToList(entry)
              history.replace(tabUrls[0])
            }}
            onClose={() => setAddPlanToListDialogOpen(false)}
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
