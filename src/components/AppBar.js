import React, { Component } from "react";

import MuiAppBar from "material-ui/AppBar";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import PersonIcon from "material-ui/svg-icons/social/person";

class AppBar extends Component {
  menuItem() {
    if (this.props.user) {
      return (
        <MenuItem
          onTouchTap={ () => this.props.onSignOut() }
          primaryText="Sign out"
        />
      );
    } else {
      return (
        <MenuItem
          onTouchTap={ () => this.props.onSignIn() }
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
          title="FatLog"
          showMenuIconButton={false}
          iconElementRight={this.menu()}
        />
      </div>
    );
  }
}

export default AppBar;
