import React from "react"
import styled from "styled-components"
import { Switch, FormControlLabel } from "@material-ui/core"
import { Typography } from "@material-ui/core"

import useSetting from "../useSetting"
import AppBar from "../components/AppBar"

const Label = styled(FormControlLabel)`
  && {
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;
  }
`

const Toggle = ({ name, value, set, beta = false }) => (
  <Label
    color="textSecondary"
    value="start"
    control={
      <Switch
        name={name}
        checked={value}
        onChange={e => set(e.target.checked)}
      />
    }
    label={name}
    labelPlacement="start"
  />
)

const Settings = () => {
  const [emoji, setEmoji] = useSetting("emojiSupport")
  const [placeholders, setPlaceholders] = useSetting("cutePlaceholders")

  const settings = [
    { name: "Emoji support", value: emoji, set: setEmoji, beta: true },
    { name: "Cute placeholders", value: placeholders, set: setPlaceholders },
  ]

  return (
    <>
      <AppBar title="Settings" />
      <Typography
        color="textSecondary"
        style={{ margin: "1rem" }}
        variant="body1"
        component="p"
      >
        You can turn off features you don't like
      </Typography>
      {settings.map(setting => (
        <Toggle key={setting.name} {...setting} />
      ))}
    </>
  )
}

export default Settings
