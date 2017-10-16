import React from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./components/App";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "./theme";
import "./index.css";

initializeApp({
  apiKey: "AIzaSyCtgligqZSkUwWkWIAcMOW0nIW2mfgVdcw",
  authDomain: "shopping-list-app-de905.firebaseapp.com",
  databaseURL: "https://shopping-list-app-de905.firebaseio.com",
  projectId: "shopping-list-app-de905",
  storageBucket: "",
  messagingSenderId: "975596815491"
});

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
