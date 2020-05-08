import React, { useState } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import MuiAppBar from "@material-ui/core/AppBar"
import LinearProgress from "@material-ui/core/LinearProgress"

import IconButton from "@material-ui/core/IconButton"
import SweepIcon from "@material-ui/icons/DeleteSweep"
import ShareIcon from "@material-ui/icons/Share"
import SwitchIcon from "@material-ui/icons/AddShoppingCart"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

import Drawer from "@material-ui/core/SwipeableDrawer"
import MuiDivider from "@material-ui/core/Divider"
import MuiList from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import { DarkModeToggle } from "./ThemeProvider"

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

const DrawHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 4px;
`

const AppBar = props => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [openDialogOpen, setOpenDialogOpen] = useState(false)
  const [newListUrl, setNewListUrl] = useState("")

  // This keeps the height consistent instead of jumping by 4 pixels
  const loadingIndicator = () =>
    props.loading ? (
      <LinearProgress mode="indeterminate" />
    ) : (
      <div style={{ height: "4px" }} />
    )

  const openNewList = () => {
    let url = newListUrl
    try {
      url = new URL(url).pathname
    } catch (Exception) {}
    window.localStorage.setItem("listName", url.replace(/[\s/]*/, ""))
    props.history.push("/")
  }

  const openDialog = () => (
    <Dialog open={openDialogOpen} onClose={() => setOpenDialogOpen(false)}>
      <DialogTitle>Open another list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To open another list, paste the URL or id here
        </DialogContentText>
        <TextField
          autoFocus
          onChange={e => setNewListUrl(e.target.value)}
          value={newListUrl}
          id="open"
          fullWidth={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={e => setOpenDialogOpen(false)}>Cancel</Button>
        <Button color="primary" onClick={e => openNewList()}>
          Open
        </Button>
      </DialogActions>
    </Dialog>
  )

  const shareDialog = () => (
    <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
      <DialogTitle>Share Live List URL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          WARNING: Anyone who has this URL will be able to view and modify this
          list!
        </DialogContentText>
        <TextField fullWidth={true} value={window.location.href} />
      </DialogContent>
      <DialogActions>
        <Button onClick={e => setShareDialogOpen(false)}>Done</Button>
      </DialogActions>
    </Dialog>
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
      {openDialog()}
      {shareDialog()}

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
            <ListItemText>Open Another List</ListItemText>
          </ListItem>
        </List>

        <DarkModeToggle />
      </Drawer>
    </div>
  )
}

export default withRouter(AppBar)
