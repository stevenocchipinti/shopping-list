import React, { Component } from "react";

import Backend from "../backend";
// import { loadState, saveState } from "../localStorage";
import { registerServiceWorker } from "../registerServiceWorker";

import AppBar from "./AppBar";
import ShoppingLists from "./ShoppingLists";
import ImportExport from "./ImportExport";

import Snackbar from "material-ui/Snackbar";
import MuiAppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

class App extends Component {
  constructor() {
    super();
    this.backend = null;
    this.state = {
      items: [],
      catalogue: {},
      showImportExport: false,
      notification: { message: "", visible: false },
      loading: true,
      offline: !navigator.onLine,
    };
  }

  // TODO: Firestore should do the offline caching once its configured!
  // componentWillUpdate(props, state) {
  //   saveState({ items: state.items, catalogue: state.catalogue });
  // }

  componentDidMount() {
    // TODO: Firestore should do the offline caching once its configured!
    // let persistedState = loadState();
    // if (persistedState) {
    //   let { items, catalogue } = persistedState;
    //   let uniqueItems = items.filter((i1,idx) => {
    //     return items.findIndex(i2 => i1.label === i2.label) === idx;
    //   });
    //   this.setState({ ...this.state, items: uniqueItems, catalogue });
    // }

    if (window) {
      window.addEventListener("online", () => {
        this.notify("Connected to server!");
        this.setState({ ...this.state, offline: false });
      });
      window.addEventListener("offline", () => {
        this.notify("Disconnected from server!");
        this.setState({ ...this.state, offline: true });
      });
    }

    registerServiceWorker({
      onInstall: () => this.notify("Now available offline"),
      onUpdate: () => this.notify("Refresh for the new version")
    });

    this.backend = new Backend({
      onItemsChanged: items => {
        this.setState({ items, loading: false });
      },
      onCatalogueChanged: catalogue => {
        this.setState({ catalogue, loading: false });
      },
    });
  }

  notify(message) {
    this.setState({ notification: { message, visible: true } });
  }
  hideNotification() {
    this.setState({ notification: { message: "", visible: false } });
  }

  handleAdd(itemName, catalogueEntry) {
    this.setState(
      {
        items: [...this.state.items, { name: itemName, done: false }],
        catalogue: { ...this.state.catalogue, ...catalogueEntry }
      },
      () => this.notify("New Item Added!")
    );
  }

  handleMove(catalogueEntry) {
    this.setState(
      {
        catalogue: { ...this.state.catalogue, ...catalogueEntry }
      },
      () => this.notify("Item Moved!")
    );
  }

  handleUncheck(itemName) {
    const index = this.state.items.findIndex(i => i.name === itemName);
    this.setState(
      {
        items: [
          ...this.state.items.slice(0, index),
          { name: itemName, done: false },
          ...this.state.items.slice(index + 1)
        ]
      },
      () => this.notify("Item Unchecked!")
    );
  }

  handleSweep() {
    this.setState({
      items: this.state.items.filter(i => !i.done)
    });
  }

  shoppingLists() {
    return (
      <div>
        <AppBar
          sweepItems={() => this.handleSweep()}
          loading={this.state.user && this.state.loading}
          offline={this.state.offline}
          showImportExport={() => this.setState({ showImportExport: true })}
        />
        <ShoppingLists
          handleMark={item => this.backend.handleMark(item)}
          items={this.state.items}
          catalogue={this.state.catalogue}
          onSubmit={entry => this.backend.handleAdd(entry.item, entry.section)}
        />
      </div>
    );
  }

  importExport() {
    return (
      <div>
        <MuiAppBar
          title="Import / Export"
          style={this.props.offline ? { backgroundColor: "#666" } : {}}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={
            () => this.setState({ showImportExport: false })
          }
        />
        <ImportExport
          data={{
            items: this.state.items,
            catalogue: this.state.catalogue
          }}
          onImport={(data) => {
            this.setState({
              items: data.items,
              catalogue: data.catalogue
            }, () => this.notify("Data imported!"));
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.state.showImportExport
          ? this.importExport()
          : this.shoppingLists()
        }

        <Snackbar
          open={this.state.notification.visible}
          message={this.state.notification.message}
          style={{ textAlign: "center" }}
          autoHideDuration={3000}
          onRequestClose={() => {
            this.hideNotification();
          }}
        />
      </div>
    );
  }
}
export default App;
