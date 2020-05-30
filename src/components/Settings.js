import React from "react"
import styled from "styled-components"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import MuiToggleButton from "@material-ui/lab/ToggleButton"
import Typography from "@material-ui/core/Typography"
import MuiBadge from "@material-ui/core/Badge"
import { Switch } from "@material-ui/core"

import useLocalStorage from "../useLocalStorage"
import AppBar from "../components/AppBar"
import { defaultToggles } from "../useSetting"

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

const Setting = ({ name, value, set }) => (
  <Row>
    <Typography variant="body1" color="textPrimary">
      {name}
    </Typography>
    <Switch
      checked={value}
      onChange={(e, newSetting) => set(newSetting)}
      name={name}
      inputProps={{ "aria-label": name }}
    />
  </Row>
)

const Experiment = ({ name, value, set }) => (
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
  const [planner, setPlanner] = useLocalStorage(
    "plannerEnabled",
    defaultToggles["plannerEnabled"]
  )
  const [emoji, setEmoji] = useLocalStorage("emojiSupport", "auto")

  const settings = [{ name: "Planner", value: planner, set: setPlanner }]
  const experiments = [{ name: "Emoji support", value: emoji, set: setEmoji }]
  return (
    <>
      <AppBar title="Settings" />
      {settings.map(setting => (
        <Setting key={setting.name} {...setting} />
      ))}
      <Typography
        color="textPrimary"
        style={{ margin: "1rem" }}
        variant="h6"
        component="h2"
      >
        Experimental features
      </Typography>
      {experiments.map(setting => (
        <Experiment key={setting.name} {...setting} />
      ))}
    </>
  )
}

export default Settings
