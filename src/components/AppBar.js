import React, { Component } from "react";
import * as firebase from "firebase";

import MuiAppBar from "material-ui/AppBar";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import PersonIcon from "material-ui/svg-icons/social/person";

class AppBar extends Component {
  constructor() {
    super();
    this.state = { user: null };
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }

  menuItem() {
    if (this.state.user) {
      return (
        <MenuItem
          onTouchTap={ () => firebase.auth().signOut() }
          primaryText="Sign out"
        />
      );
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      return (
        <MenuItem
          onTouchTap={ () => firebase.auth().signInWithRedirect(provider) }
          primaryText="Sign in"
        />
      );
    }
  }

  menu() {
    const iconButton = <IconButton><PersonIcon /></IconButton>;
    return (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "top"}}
      >
        { this.menuItem() }
      </IconMenu>
    );
  }

  render() {
    return (
      <div>
        <MuiAppBar
          title={this.state.user ? this.state.user.displayName : "FatLog"}
          showMenuIconButton={false}
          iconElementRight={this.menu()}
        />
      </div>
    );
  }
}

export default AppBar;
