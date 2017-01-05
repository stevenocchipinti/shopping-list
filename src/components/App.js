import React, { Component } from "react";

import backend from "../backend";
import { registerServiceWorker } from "../serviceWorkerRegistration";

import LoadingSpinner from "./LoadingSpinner";
import Snackbar from "material-ui/Snackbar";
import Placeholder from "./Placeholder";
import CheckinTable from "./CheckinTable";
import NewCheckinDialog from "./NewCheckinDialog";
import AppBar from "./AppBar";


class App extends Component {
  constructor() {
    super();
    this.state = {
      notification: {
        message: "",
        visible: false
      }
    };
  }

  componentDidMount() {
    registerServiceWorker({
      onInstall: () => {
        this.notify("Now available offline");
      },
      onUpdate: () => {
        this.notify("Refresh for the new version");
      }
    });

    backend.init({
      onAuthStateChanged: user => {
        this.setState({...this.state, user});
      },
      onCheckinsChanged: checkins => {
        this.setState({...this.state, checkins});
      }
    });
  }

  handleCreate(checkin) {
    backend.addCheckin(checkin);
  }

  handleDelete(checkinKey) {
    backend.deleteCheckin(checkinKey).then(() => {
      this.notify("Check-in deleted");
    });
  }

  notify(message) {
    this.setState({
      ...this.state,
      notification: { message, visible: true }
    });
  }
  hideNotification() {
    this.setState({
      ...this.state,
      notification: { message: "", visible: false }
    });
  }

  body() {
    if (!backend.currentUser()) {
      return <Placeholder>Not signed in</Placeholder>;
    } else if (!this.state.checkins) {
      return <LoadingSpinner />;
    } else if (this.state.checkins.length === 0) {
      return <Placeholder>No logs yet</Placeholder>;
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

        <NewCheckinDialog onSubmit={ checkin => this.handleCreate(checkin) }/>

        { this.body() }

        <footer style={{ height: "100px" }} />

        <Snackbar
          open={this.state.notification.visible}
          message={this.state.notification.message}
          style={{textAlign: "center"}}
          autoHideDuration={3000}
          onRequestClose={ () => { this.hideNotification(); } }
        />
      </div>
    );
  }
}
export default App;
