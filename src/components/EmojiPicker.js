import React from "react"
import { useTheme } from "styled-components"
import { Popover, Button } from "@material-ui/core"
import { Picker } from "emoji-mart"

import "emoji-mart/css/emoji-mart.css"

export default ({ open, anchorEl, onClose, onSelect }) => {
  const { palette } = useTheme()

  return (
    <Popover
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          backgroundColor: palette.type === "dark" ? "#222" : "white",
        },
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Picker
        color={palette.primary.main}
        theme={palette.type}
        set="apple"
        autoFocus
        showPreview={false}
        showSkinTones={false}
        onSelect={e => {
          onSelect(e.id)
          onClose()
        }}
        perLine={7}
        style={{ margin: "0 auto", border: 0 }}
      />
      <Button
        onClick={() => {
          onSelect(null)
          onClose()
        }}
      >
        Clear
      </Button>
    </Popover>
  )
}
