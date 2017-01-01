import React, { Component } from "react";

import backend from "../backend";

import LoadingSpinner from "./LoadingSpinner";
import NoLogsPlaceholder from "./NoLogsPlaceholder";
import CheckinTable from "./CheckinTable";
import NewCheckinDialog from "./NewCheckinDialog";
import AppBar from "./AppBar";


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    backend.init({
      onAuthStateChanged: user => {
        this.setState({...this.state, user});
      },
      onCheckinsChanged: checkins => {
        this.setState({...this.state, checkins});
      }
    });
  }

  handleSubmit(checkin) {
    backend.addCheckin(checkin);
  }

  handleDelete(checkinKey) {
    backend.deleteCheckin(checkinKey);
  }

  body() {
    if (!this.state.checkins) {
      return <LoadingSpinner />;
    } else if (this.state.checkins.length === 0) {
      return <NoLogsPlaceholder />;
    } else {
      return (
        <CheckinTable
          checkins={ this.state.checkins }
          onDelete={ (key) => this.handleDelete(key) }
        />
      );
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar
          onSignIn={backend.signIn}
          onSignOut={backend.signOut}
          user={this.state.user}
        />

        <NewCheckinDialog onSubmit={ checkin => this.handleSubmit(checkin) }/>

        { this.body() }

        <footer style={{ height: "100px" }} />
      </div>
    );
  }
}
export default App;
