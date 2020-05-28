import React, { useContext, createContext } from "react"
import styled, { ThemeProvider as ScThemeProvider } from "styled-components"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import { createMuiTheme } from "@material-ui/core/styles"
import teal from "@material-ui/core/colors/teal"

import MuiToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import ToggleButton from "@material-ui/lab/ToggleButton"
import Brightness3 from "@material-ui/icons/Brightness3"
import BrightnessHigh from "@material-ui/icons/BrightnessHigh"
import BrightnessAuto from "@material-ui/icons/BrightnessAuto"

import useLocalStorage from "../useLocalStorage"

const DarkModeContext = createContext(null)

const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  margin: 16px auto;
`

const DarkModeToggle = () => {
  const { brightnessPreference, setBrightnessPreference } = useContext(
    DarkModeContext
  )

  return (
    <ToggleButtonGroup
      value={brightnessPreference}
      exclusive
      onChange={(_, newPref) => newPref && setBrightnessPreference(newPref)}
      aria-label="Brightness preference"
    >
      <ToggleButton value="light" aria-label="left aligned">
        <BrightnessHigh />
      </ToggleButton>
      <ToggleButton value="dark" aria-label="centered">
        <Brightness3 />
      </ToggleButton>
      <ToggleButton value="auto" aria-label="right aligned">
        <BrightnessAuto />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

const AppThemeProvider = ({ children }) => {
  const [brightnessPreference, setBrightnessPreference] = useLocalStorage(
    "brightnessPreference",
    "auto"
  )
  const autoDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = React.useMemo(() => {
    const effectiveModes = {
      light: "light",
      dark: "dark",
      auto: autoDarkMode ? "dark" : "light",
    }
    return createMuiTheme({
      palette: {
        type: effectiveModes[brightnessPreference],
        primary: teal,
      },
    })
  }, [autoDarkMode, brightnessPreference])

  return (
    <DarkModeContext.Provider
      value={{ brightnessPreference, setBrightnessPreference }}
    >
      {children(theme)}
    </DarkModeContext.Provider>
  )
}

const ThemeProvider = ({ children }) => {
  return (
    <AppThemeProvider>
      {theme => (
        <ScThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ScThemeProvider>
      )}
    </AppThemeProvider>
  )
}

export { ThemeProvider, DarkModeToggle }
