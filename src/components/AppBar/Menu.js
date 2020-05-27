import React, { useState } from "react"
import styled from "styled-components"
import { Link, useParams } from "react-router-dom"

import IconButton from "@material-ui/core/IconButton"
import ShareIcon from "@material-ui/icons/Share"
import SwitchIcon from "@material-ui/icons/SwapHoriz"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import HistoryIcon from "@material-ui/icons/History"

import Drawer from "@material-ui/core/SwipeableDrawer"
import MuiDivider from "@material-ui/core/Divider"
import MuiList from "@material-ui/core/List"
import MuiListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

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

const AppBar = ({ open, onOpen, onClose }) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [openDialogOpen, setOpenDialogOpen] = useState(false)

  let { listId } = useParams()

  return (
    <>
      <OpenDialog
        open={openDialogOpen}
        onClose={() => setOpenDialogOpen(false)}
      />

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
      />

      <Drawer open={open} onOpen={onOpen} onClose={onClose}>
        <List component="nav">
          <DrawHeader>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawHeader>
          <Divider />

          <ListItem
            button
            onClick={() => {
              onClose()
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
            onClick={() => {
              onClose()
              setOpenDialogOpen(true)
            }}
          >
            <ListItemIcon>
              <SwitchIcon />
            </ListItemIcon>
            <ListItemText>Change list</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to={`/list/${listId}/catalogue`}
            onClick={() => onClose()}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItem>
        </List>

        <DarkModeToggle />
      </Drawer>
    </>
  )
}

export default AppBar
