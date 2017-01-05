import React, { Component } from "react";

import MuiAppBar from "material-ui/AppBar";
import LinearProgress from "material-ui/LinearProgress";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import PersonIcon from "material-ui/svg-icons/social/person";

class AppBar extends Component {
  menuContent() {
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
        { this.menuContent() }
      </IconMenu>
    );
  }

  loadingIndicator() {
    if (this.props.loading) {
      return <LinearProgress mode="indeterminate" />;
    } else {
      // This keeps the height consistent instead of jumping by 4 pixels
      return <div style={{ height: "4px" }} />;
    }
  }

  render() {
    return (
      <div>
        <MuiAppBar
          title="FatLog"
          showMenuIconButton={false}
          iconElementRight={this.menu()}
          style={this.props.offline ? {backgroundColor: "#666"} : {}}
        />
        { this.loadingIndicator() }
      </div>
    );
  }
}

export default AppBar;
