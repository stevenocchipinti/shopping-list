import React from "react"
import styled from "styled-components"
import {
  ToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from "@material-ui/lab"
import { Typography, Badge as MuiBadge } from "@material-ui/core"

import useSetting from "../useSetting"
import AppBar from "../components/AppBar"

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`

const Badge = styled(MuiBadge).attrs({
  color: "secondary",
  badgeContent: "beta",
})`
  & .MuiBadge-badge {
    transform: scale(1) translate(100%, -50%);
  }
`

const ToggleButton = styled(MuiToggleButton)`
  .MuiToggleButton-label {
    color: ${({ theme }) => theme.palette.text.primary};
  }
  && {
    border: 1px solid ${({ theme }) => theme.palette.text.hint};
  }
`

const Toggle = ({ name, value, set }) => (
  <Row>
    <Badge>
      <Typography variant="body1" color="textPrimary">
        {name}
      </Typography>
    </Badge>
    <ToggleButtonGroup
      exclusive
      aria-label={name}
      value={value}
      onChange={(e, newSetting) => newSetting && set(newSetting)}
    >
      <ToggleButton value="on" aria-label={`${name} on`}>
        On
      </ToggleButton>
      <ToggleButton value="off" aria-label={`${name} off`}>
        Off
      </ToggleButton>
      <ToggleButton value="auto" aria-label={`default ${name}`}>
        Default
      </ToggleButton>
    </ToggleButtonGroup>
  </Row>
)

const Settings = () => {
  const [, emoji, setEmoji] = useSetting("emojiSupport", "auto")
  const settings = [{ name: "Emoji support", value: emoji, set: setEmoji }]
  return (
    <>
      <AppBar title="Experiments" />
      <Typography
        color="textSecondary"
        style={{ margin: "1rem" }}
        variant="body1"
        component="p"
      >
        There are experimental features that may not work 100% just yet.
      </Typography>
      {settings.map(setting => (
        <Toggle key={setting.name} {...setting} />
      ))}
    </>
  )
}

export default Settings
