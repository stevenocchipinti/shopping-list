import React, { useState } from "react"
import styled from "styled-components"
import { Link, withRouter, useParams } from "react-router-dom"

import MuiAppBar from "@material-ui/core/AppBar"
import LinearProgress from "@material-ui/core/LinearProgress"

import IconButton from "@material-ui/core/IconButton"
import SweepIcon from "@material-ui/icons/DeleteSweep"
import ShareIcon from "@material-ui/icons/Share"
import SwitchIcon from "@material-ui/icons/SwapHoriz"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import HistoryIcon from "@material-ui/icons/History"

import Drawer from "@material-ui/core/SwipeableDrawer"
import MuiDivider from "@material-ui/core/Divider"
import MuiList from "@material-ui/core/List"
import MuiListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import OpenDialog from "./OpenDialog"
import ShareDialog from "./ShareDialog"
import { DarkModeToggle } from "../ThemeProvider"

const Divider = styled(MuiDivider)`
  && {
    margin-bottom: 8px;
  }
`

const List = styled(MuiList)`
  && {
    padding: 0;
  }
`

const ListItem = styled(MuiListItem)`
  && {
    padding-right: 3rem;
  }
`

const DrawHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 4px;
`

const AppBar = props => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [openDialogOpen, setOpenDialogOpen] = useState(false)

  let { listId } = useParams()

  // This keeps the height consistent instead of jumping by 4 pixels
  const loadingIndicator = () =>
    props.loading ? (
      <LinearProgress mode="indeterminate" />
    ) : (
      <div style={{ height: "4px" }} />
    )

  return (
    <div>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            color="inherit"
            edge="start"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1 }} variant="h6" component="h1">
            Shopping list
          </Typography>
          <IconButton
            onClick={() => props.sweepItems()}
            color="inherit"
            edge="end"
            aria-label="Sweep"
          >
            <SweepIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      {loadingIndicator()}

      <OpenDialog
        open={openDialogOpen}
        onClose={() => setOpenDialogOpen(false)}
      />

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
      />

      <Drawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <List component="nav">
          <DrawHeader>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawHeader>
          <Divider />
          <ListItem
            button
            onClick={e => {
              props.sweepItems()
              setDrawerOpen(false)
            }}
          >
            <ListItemIcon>
              <SweepIcon />
            </ListItemIcon>
            <ListItemText>Clear Done Items</ListItemText>
          </ListItem>

          <ListItem
            button
            onClick={e => {
              setDrawerOpen(false)
              setShareDialogOpen(true)
            }}
          >
            <ListItemIcon>
              <ShareIcon />
            </ListItemIcon>
            <ListItemText>Share Live List</ListItemText>
          </ListItem>

          <ListItem
            button
            onClick={e => {
              setDrawerOpen(false)
              setOpenDialogOpen(true)
            }}
          >
            <ListItemIcon>
              <SwitchIcon />
            </ListItemIcon>
            <ListItemText>Change list</ListItemText>
          </ListItem>

          <ListItem button component={Link} to={`/list/${listId}/catalogue`}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItem>
        </List>

        <DarkModeToggle />
      </Drawer>
    </div>
  )
}

export default withRouter(AppBar)
