import React, { Component } from 'react';
import * as firebase from "firebase";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    firebase.database().ref("/messages").on("value", snapshot => {
      const messages = snapshot.val();
      this.setState({
        messages: Object.keys(messages).map(k => {
          return { key: k, message: messages[k].message }
        })
      })
    });
  }

  render() {
    const messageComponents = this.state.messages.map(message => {
      return <li key={message.key}>{message.message}</li>
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul>{ messageComponents }</ul>
      </div>
    );
  }
}

export default App;
