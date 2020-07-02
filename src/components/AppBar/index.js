import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"

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
  title = "Shopping list",
  variant,
  loading,
  back,
  actions = [],
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { listId } = useParams()
  const backUrl = back || (listId ? `/list/${listId}` : "/")

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
              to={backUrl}
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
