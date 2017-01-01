import React, { Component } from "react";
import * as firebase from "firebase";

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
    var that = this;
    firebase.auth().onAuthStateChanged(user => {
      this.setState({...this.state, user});

      if (!user) return;
      that.checkinsRef().on("value", snapshot => {
        const checkins = snapshot.val();
        if (checkins) {
          that.setState({
            ...that.state,
            checkins: Object.keys(checkins).reverse().map(k => {
              return {
                key: k,
                date: checkins[k].createdAt,
                weight: checkins[k].weight,
                fat: checkins[k].fat,
                waist: checkins[k].waist
              };
            })
          });
        } else {
          that.setState({...that.state, checkins: []});
        }
      });
    });

  }

  checkinsRef() {
    return firebase.database().ref(`/checkins/${this.state.user.uid}`);
  }

  handleSignIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  handleSignOut() {
    firebase.auth().signOut();
  }

  handleSubmit(checkin) {
    if (!this.state.user) return;
    let newCheckinRef = this.checkinsRef().push();
    newCheckinRef.set({
      createdAt: checkin.date.toISOString(),
      weight: checkin.weight,
      fat: checkin.fat,
      waist: checkin.waist
    });
  }

  handleDelete(checkinKey) {
    if (!this.state.user) return;
    this.checkinsRef().child(checkinKey).remove();
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
          onSignIn={ () => this.handleSignIn() }
          onSignOut={ () => this.handleSignOut() }
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
