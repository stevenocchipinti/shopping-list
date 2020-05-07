import React from "react"
import ReactDOM from "react-dom"
import { createGlobalStyle } from "styled-components"
import { BrowserRouter as Router, Route } from "react-router-dom"
import * as Firebase from "firebase/app"
import "firebase/firestore"
import * as serviceWorker from "./serviceWorker"

import App from "./components/App"
import Home from "./components/Home"
import { ThemeProvider } from "./components/ThemeProvider"

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
  return (
    <ThemeProvider>
      <Router>
        <>
          <GlobalStyle />
          <Route path="/" exact={true} component={Home} />
          <Route path="/list/:listId" component={App} />
        </>
      </Router>
    </ThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
serviceWorker.unregister()
