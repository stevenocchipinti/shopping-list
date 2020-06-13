import React from "react"
import styled from "styled-components"
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from "@material-ui/lab"

const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  width: 100%;
  margin-bottom: 2rem;
`

const ToggleButton = styled(MuiToggleButton)`
  flex-grow: 1;
`

const DayPicker = ({ days, value, onChange }) => (
  <ToggleButtonGroup
    exclusive
    value={value || days[0]}
    onChange={(e, v) => onChange(v)}
    aria-label="Day"
  >
    {days.map(d => (
      <ToggleButton key={d} value={d}>
        {d[0]}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
)

export default DayPicker
