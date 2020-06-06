import React from "react"
import styled from "styled-components"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Link as MuiLink,
} from "@material-ui/core"

const Link = styled(MuiLink).attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})``

const AboutDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>About </DialogTitle>
    <DialogContent>
      <DialogContentText>
        A side project by{" "}
        <Link href="https://stevenocchipinti.com">Steve Occhipinti</Link>.
      </DialogContentText>
      <DialogContentText>
        Custom emojis, bug reports and other contributions welcome on the{" "}
        <Link href="https://github.com/stevenocchipinti/shopping-list">
          github page
        </Link>
        .
      </DialogContentText>
      <DialogContentText>
        Custom icons provided for free by{" "}
        <Link href="https://icons8.com">Icons8</Link>.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Done</Button>
    </DialogActions>
  </Dialog>
)

export default AboutDialog
