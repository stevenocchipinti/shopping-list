import React, { Component } from "react";

// import backend from "../backend";
import { loadState, saveState } from "../localStorage";
import { registerServiceWorker } from "../registerServiceWorker";

import AppBar from "./AppBar";
import ShoppingLists from "./ShoppingLists";
import Catalogue from "./Catalogue";

import Snackbar from "material-ui/Snackbar";
import MuiAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      catalogue: {},
      showCatalogue: false,
      notification: { message: "", visible: false },
      loading: true,
      offline: false//!navigator.onLine,
    };
  }

  componentWillUpdate(props, state) {
    saveState({items: state.items, catalogue: state.catalogue});
  }

  componentDidMount() {
    let persistedState = loadState();
    if (persistedState) {
      this.setState({
        ...this.state,
        items: persistedState.items,
        catalogue: persistedState.catalogue
      });
    }

    if (window) window.addEventListener("online", () => {
      this.notify("Connected to server!");
      this.setState({...this.state, offline: false});
    });
    if (window) window.addEventListener("offline", () => {
      this.notify("Disconnected from server!");
      this.setState({...this.state, offline: true});
    });

    // backend.init({
    //   onCheckinsChanged: checkins => {
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       checkins
    //     });
    //   }
    // });
  }

  installServiceWorker() {
    registerServiceWorker({
      onInstall: () => { this.notify("Now available offline"); },
      onUpdate: () => { this.notify("Refresh for the new version"); }
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

  handleAdd(itemName, catalogueEntry) {
    this.setState({
      items: [...this.state.items, { label: itemName, done: false }],
      catalogue: {...this.state.catalogue, ...catalogueEntry}
    }, () => this.notify("New Item Added!"));
  }

  handleMove(catalogueEntry) {
    this.setState({
      catalogue: {...this.state.catalogue, ...catalogueEntry}
    }, () => this.notify("Item Moved!"));
  }

  handleUncheck(itemName) {
    const index = this.state.items.findIndex(i => i.label === itemName);
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        { label: itemName, done: false },
        ...this.state.items.slice(index + 1)
      ]
    }, () => this.notify("Item Unchecked!"));
  }

  handleMark(item) {
    const index = this.state.items.findIndex(i => i.label === item.label);
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        {...item, done: !item.done},
        ...this.state.items.slice(index + 1)
      ]
    });
  }

  handleSweep() {
    this.setState({
      items: this.state.items.filter(i => !i.done)
    })
  }

  handleSubmit(entry) {
    let catalogueEntry = {};
    catalogueEntry[entry.item] = entry.section;

    const itemOnList = this.state.items.find(i => i.label === entry.item);
    const storedSection = this.state.catalogue[entry.item];

    if (itemOnList && storedSection !== entry.section) {
      this.handleMove(catalogueEntry);
    } else if (itemOnList && storedSection === entry.section) {
      this.handleUncheck(entry.item);
    } else {
      this.handleAdd(entry.item, catalogueEntry);
    }
  }

  shoppingLists() {
    return (
      <div>
        <AppBar
          sweepItems={() => this.handleSweep()}
          loading={this.state.user && this.state.loading}
          offline={this.state.offline}
          showCatalogue={() => this.setState({showCatalogue: true})}
        />
        <ShoppingLists
          handleMark={item => this.handleMark(item)}
          items={this.state.items}
          catalogue={this.state.catalogue}
          onSubmit={(entry) => {this.handleSubmit(entry)}}
        />
      </div>
    )
  }

  catalogue() {
    return (
      <div>
        <MuiAppBar
          title="Catalogue"
          style={this.props.offline ? { backgroundColor: "#666" } : {}}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={() =>
            this.setState({ showCatalogue: false })}
        />
        <Catalogue catalogue={this.state.catalogue} />
      </div>
    );
  }

  render() {
    return (
      <div className="App">

        { this.state.showCatalogue ? this.catalogue() : this.shoppingLists() }

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
