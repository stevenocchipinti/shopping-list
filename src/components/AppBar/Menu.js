import React, { useState } from "react"
import styled from "styled-components"
import { Link, useParams } from "react-router-dom"

import {
  // MenuBookTwoTone as RecipesIcon,
  Share as ShareIcon,
  SwapHoriz as SwitchIcon,
  ChevronLeft as ChevronLeftIcon,
  History as HistoryIcon,
  InfoOutlined as AboutIcon,
  Tune as SettingsIcon,
} from "@material-ui/icons"

import {
  IconButton,
  SwipeableDrawer as Drawer,
  Divider as MuiDivider,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"

import OpenDialog from "./OpenDialog"
import ShareDialog from "./ShareDialog"
import AboutDialog from "./AboutDialog"
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
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false)

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

      <AboutDialog
        open={aboutDialogOpen}
        onClose={() => setAboutDialogOpen(false)}
      />

      <Drawer open={open} onOpen={onOpen} onClose={onClose}>
        <List component="nav">
          <DrawHeader>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawHeader>
          <Divider />

          {/* TODO: Bring this back
          <ListItem
            button
            component={Link}
            to={`/list/${listId}/recipes`}
            onClick={() => onClose()}
          >
            <ListItemIcon>
              <RecipesIcon />
            </ListItemIcon>
            <ListItemText>Recipes</ListItemText>
          </ListItem> */}

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

          <ListItem
            button
            component={Link}
            to="/settings"
            onClick={() => onClose()}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>

          <ListItem
            button
            onClick={() => {
              onClose()
              setAboutDialogOpen(true)
            }}
          >
            <ListItemIcon>
              <AboutIcon />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
        </List>
        <DarkModeToggle />
      </Drawer>
    </>
  )
}

export default AppBar
