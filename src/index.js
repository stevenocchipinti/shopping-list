import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { BrowserRouter as Router, Route } from "react-router-dom"
import * as Firebase from "firebase/app"
import "firebase/firestore"

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles"
import teal from "@material-ui/core/colors/teal"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import App from "./components/App"
import Home from "./components/Home"
import registerServiceWorker from "./registerServiceWorker"

Firebase.initializeApp({
  apiKey: "AIzaSyCtgligqZSkUwWkWIAcMOW0nIW2mfgVdcw",
  authDomain: "shopping-list-app-de905.firebaseapp.com",
  databaseURL: "https://shopping-list-app-de905.firebaseio.com",
  projectId: "shopping-list-app-de905",
  storageBucket: "",
  messagingSenderId: "975596815491",
})
Firebase.firestore().enablePersistence()

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.background.default};
    height: 100vh;
  }
  * {
    font-family: Roboto, sans-serif;
    box-sizing: border-box;
  }
`

const Root = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: teal,
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <>
            <GlobalStyle />
            <Route path="/" exact={true} component={Home} />
            <Route path="/list/:listId" component={App} />
          </>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
registerServiceWorker()
