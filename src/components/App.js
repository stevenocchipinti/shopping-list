import React, { Component } from "react";
import * as firebase from "firebase";

import AppBar from "material-ui/AppBar";

import NewEntryForm from "./NewEntryForm";
import LoadingSpinner from "./LoadingSpinner";
import CheckinTable from "./CheckinTable";

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkins: []
    };
  }

  componentDidMount() {
    firebase.database().ref("/checkins").on("value", snapshot => {
      const checkins = snapshot.val();
      this.setState({
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
    });
  }

  body() {
    if (this.state.checkins.length === 0) {
      return <LoadingSpinner />;
    } else {
      return <CheckinTable checkins={ this.state.checkins }/>;
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar title="FatLog" showMenuIconButton={false} />
        <NewEntryForm />
        { this.body() }
      </div>
    );
  }
}
export default App;
