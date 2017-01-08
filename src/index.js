import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./components/App";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "./theme";
import "./index.css";

const config = {
  apiKey: "AIzaSyCk78H-sLkJt6WbwqM9tAP9DIeZe9iWOTA",
  authDomain: "fatlog-app.firebaseapp.com",
  databaseURL: "https://fatlog-app.firebaseio.com",
  storageBucket: "fatlog-app.appspot.com",
  messagingSenderId: "893039177685"
};
firebase.initializeApp(config);

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
