import React, { Component } from "react";
import * as firebase from "firebase";

import LoadingSpinner from "./LoadingSpinner";
import CheckinTable from "./CheckinTable";
import NewCheckinDialog from "./NewCheckinDialog";
import AppBar from "./AppBar";


class App extends Component {
  constructor() {
    super();
    this.checkinsRef = firebase.database().ref("/checkins");
    this.state = { checkins: [] };
  }

  componentDidMount() {
    this.checkinsRef.on("value", snapshot => {
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

  handleSubmit(checkin) {
    let newCheckinRef = this.checkinsRef.push();
    newCheckinRef.set({
      createdAt: checkin.date.toISOString(),
      weight: checkin.weight,
      fat: checkin.fat,
      waist: checkin.waist
    });
  }

  handleDelete(checkinKey) {
    this.checkinsRef.child(checkinKey).remove();
  }

  body() {
    if (this.state.checkins.length === 0) {
      return <LoadingSpinner />;
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
        <AppBar />
        <NewCheckinDialog onSubmit={ checkin => this.handleSubmit(checkin) }/>
        { this.body() }
        <footer style={{ height: "100px" }} />
      </div>
    );
  }
}
export default App;
