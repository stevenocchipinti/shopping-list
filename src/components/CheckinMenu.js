import React, { Component } from "react";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

export default class CheckinMenu extends Component {
  constructor() {
    super();
    this.state = {
      deleteConfirmationOpen: false
    };
  }

  openDeleteConfirmation() {
    this.setState({deleteConfirmationOpen: true});
  }

  closeDeleteConfirmation() {
    this.setState({deleteConfirmationOpen: false});
  }

  handleDelete() {
    this.props.onDelete(this.props.checkinKey);
  }

  render() {
    const iconButton = (
      <IconButton style={ this.props.iconButtonStyle }>
        <MoreVertIcon />
      </IconButton>
    );

    const actions = (
      <div>
        <FlatButton
          label="Cancel"
          onTouchTap={ () => this.closeDeleteConfirmation() }
        />
        <RaisedButton
          label="Delete"
          secondary={true}
          onTouchTap={ () => this.handleDelete() }
        />
      </div>
    );

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.deleteConfirmationOpen}
          onRequestClose={ () => { this.closeDeleteConfirmation(); } }
        >
          Are you sure you want to delete?
        </Dialog>
        <IconMenu
          iconButtonElement={iconButton}
          anchorOrigin={{horizontal: "right", vertical: "top"}}
          targetOrigin={{horizontal: "right", vertical: "top"}}
        >
          <MenuItem
            onTouchTap={ () => { this.openDeleteConfirmation(); } }
            primaryText="Delete"
          />
        </IconMenu>
      </div>
    );
  }
}
