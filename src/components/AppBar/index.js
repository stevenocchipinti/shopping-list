import React, { useState } from "react"
import { Link } from "react-router-dom"

import {
  AppBar as MuiAppBar,
  LinearProgress,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core"
import { Menu as MenuIcon, ArrowBack as BackIcon } from "@material-ui/icons"

import Menu from "./Menu"

const AppBar = ({
  title = "Shopping List",
  variant,
  loading,
  actions = [],
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const listId = window.localStorage.getItem("listName")

  // This keeps the height consistent instead of jumping by 4 pixels
  const loadingIndicator = () =>
    loading ? (
      <LinearProgress mode="indeterminate" />
    ) : (
      <div style={{ height: "4px" }} />
    )

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          {variant === "main" ? (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              edge="start"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              component={Link}
              to={listId ? `/list/${listId}` : "/"}
              color="inherit"
              edge="start"
              aria-label="back"
            >
              <BackIcon />
            </IconButton>
          )}

          <Typography style={{ flexGrow: 1 }} variant="h6" component="h1">
            {title}
          </Typography>
          {actions}
        </Toolbar>
      </MuiAppBar>

      {loadingIndicator()}

      {variant === "main" && (
        <Menu
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  )
}

export default AppBar
