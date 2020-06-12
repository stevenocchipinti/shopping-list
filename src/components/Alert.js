import React from "react"
import { Alert as MuiAlert } from "@material-ui/lab"
import { Fade } from "@material-ui/core"

const Alert = ({ children, visible = true, severity = "success" }) => (
  <Fade in={visible}>
    <MuiAlert severity={severity}>{children}</MuiAlert>
  </Fade>
)

export default Alert
