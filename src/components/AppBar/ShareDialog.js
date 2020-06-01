import React from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core"

const ShareDialog = ({ open, onClose }) => {
  const share = e => {
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: "My shopping list",
          url: window.location.href,
        })
        .then(onClose)
        .catch(console.error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share Live List URL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          WARNING: Anyone who has this URL will be able to view and modify this
          list!
        </DialogContentText>
        <TextField
          variant="outlined"
          inputRef={el => el && el.select()}
          fullWidth={true}
          value={window.location.href}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
        {navigator.share !== undefined && (
          <Button color="primary" variant="contained" onClick={share}>
            Share
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ShareDialog
