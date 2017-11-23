import React from "react";
import ReactDOM from "react-dom";
import Firebase from "firebase";
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./components/App";
import Home from "./components/Home";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "./theme";
import "./index.css";

Firebase.initializeApp({
  apiKey: "AIzaSyCtgligqZSkUwWkWIAcMOW0nIW2mfgVdcw",
  authDomain: "shopping-list-app-de905.firebaseapp.com",
  databaseURL: "https://shopping-list-app-de905.firebaseio.com",
  projectId: "shopping-list-app-de905",
  storageBucket: "",
  messagingSenderId: "975596815491"
});
Firebase.firestore().enablePersistence()

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Router>
      <div>
        <Route path="/" exact={true} component={Home} />
        <Route path="/list/:listId" component={App} />
      </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
