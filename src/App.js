import React, { Component } from 'react';
import * as firebase from "firebase";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { message: "Hello World" }
  }

  componentDidMount() {
    firebase.database().ref("/message").on("value", snapshot => {
      this.setState({
        message: snapshot.val()
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          { this.state.message }
        </p>
      </div>
    );
  }
}

export default App;
