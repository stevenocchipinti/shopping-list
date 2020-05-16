import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"

import MuiAppBar from "@material-ui/core/AppBar"
import LinearProgress from "@material-ui/core/LinearProgress"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import IconButton from "@material-ui/core/IconButton"
import SweepIcon from "@material-ui/icons/DeleteSweep"
import MenuIcon from "@material-ui/icons/Menu"
import BackIcon from "@material-ui/icons/ArrowBack"

import Menu from "./Menu"

const AppBar = ({ title = "Shopping List", variant, loading, sweepItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { listId } = useParams()

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
              to={`/list/${listId}`}
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
          {variant === "main" && (
            <IconButton
              onClick={() => sweepItems()}
              color="inherit"
              edge="end"
              aria-label="Sweep"
            >
              <SweepIcon />
            </IconButton>
          )}
        </Toolbar>
      </MuiAppBar>

      {loadingIndicator()}

      <Menu
        sweepItems={sweepItems}
        open={variant === "main" && drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}

export default AppBar
