import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './index.css';

const config = {
  apiKey: "AIzaSyCzW5_IINwJFTEM0VqSyYCRgNGlzYLoSno",
  authDomain: "fatlog-staging.firebaseapp.com",
  databaseURL: "https://fatlog-staging.firebaseio.com",
  storageBucket: "fatlog-staging.appspot.com",
  messagingSenderId: "1031126490652"
};
firebase.initializeApp(config);

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
