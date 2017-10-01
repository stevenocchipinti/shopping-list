import React, { Component } from "react";

import MuiAppBar from "material-ui/AppBar";
import LinearProgress from "material-ui/LinearProgress";

import IconButton from "material-ui/IconButton";
import SweepIcon from "material-ui/svg-icons/content/delete-sweep";
import ShareIcon from "material-ui/svg-icons/social/share";
import CatalogueIcon from "material-ui/svg-icons/communication/import-contacts";
import SwitchIcon from "material-ui/svg-icons/action/add-shopping-cart";

import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      shareDialogOpen: false
    };
  }

  loadingIndicator() {
    if (this.props.loading) {
      return <LinearProgress mode="indeterminate" />;
    } else {
      // This keeps the height consistent instead of jumping by 4 pixels
      return <div style={{ height: "4px" }} />;
    }
  }

  shareDialog() {
    return (
      <Dialog
        title="Share Live List URL"
        modal={false}
        open={this.state.shareDialogOpen}
        onRequestClose={() => this.setState({shareDialogOpen: false})}
      >
        WARNING: Anyone who has this URL will be able to view and
        modify this list!
        <TextField id="share" fullWidth={true} value={window.location.href} />
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        <MuiAppBar
          title="Shopping List"
          iconElementRight={
            <IconButton>
              <SweepIcon />
            </IconButton>
          }
          onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: true })}
          onRightIconButtonTouchTap={() => this.props.sweepItems()}
          style={this.props.offline ? { backgroundColor: "#666" } : {}}
        />
        {this.loadingIndicator()}

        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={open => this.setState({ drawerOpen: open })}
        >
          <MuiAppBar
            title="Shopping List"
            style={this.props.offline ? { backgroundColor: "#666" } : {}}
            onLeftIconButtonTouchTap={() =>
              this.setState({ drawerOpen: false })}
          />

          <MenuItem
            onClick={e => {
              this.props.showCatalogue();
              this.setState({ drawerOpen: false });
            }}
            leftIcon={<CatalogueIcon />}
          >
            View All Items{" "}
          </MenuItem>

          <MenuItem
            onClick={e => {
              this.props.sweepItems();
              this.setState({ drawerOpen: false });
            }}
            leftIcon={<SweepIcon />}
          >
            Clear Done Items
          </MenuItem>

          <MenuItem
            onClick={e => {
              this.setState({ drawerOpen: false, shareDialogOpen: true });
            }}
            leftIcon={<ShareIcon />}
          >
            Share Live List
          </MenuItem>
          { this.shareDialog() }

          <MenuItem
            onClick={e => {
              this.props.sweepItems();
              this.setState({ drawerOpen: false });
            }}
            leftIcon={<SwitchIcon />}
          >
            Open Another List
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default AppBar;
