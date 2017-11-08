import React, { Component } from "react";

import NewItemDialog from "./NewItemDialog";
import slugify from '../helpers/slugify';

import Paper from "material-ui/Paper";
import Chip from 'material-ui/Chip';


class App extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      item: {
        margin: 4,
      },
      doneItemLabel: {
        textDecorationLine: "line-through",
        backgroundColor: "white",
        color: "#aaa"
      },
      heading: {

      },
      paper: {
        margin: 10,
        padding: 10
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  itemsBySection() {
    return this.props.items.reduce((a,item) => {
      let section = this.props.catalogue[slugify(item.name)] || "Uncategorized"
      if (Array.isArray(a[section])) {
        a[section].push(item);
      } else {
        a[section] = [item];
      }
      return a;
    }, {})
  }

  renderItemsFor(section) {
    const notDone = section.filter(i => !i.done).sort();
    const done = section.filter(i => i.done).sort();
    return notDone.concat(done).map((item, index) => {
      return (
        <Chip
          key={index}
          onClick={() => this.props.handleMark(item.name)}
          style={this.styles.item}
          labelStyle={item.done ? this.styles.doneItemLabel : {}}
        >
          {item.name}
        </Chip>
      );
    });
  }

  renderSections() {
    const data = this.itemsBySection()
    return Object.keys(data).map((section, index) => {
      return (
        <Paper key={index} style={this.styles.paper}>
          <h2>{section}</h2>
          <div style={this.styles.wrapper}>
            { this.renderItemsFor(data[section]) }
          </div>
        </Paper>
      )
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 100 }}>
        { this.renderSections() }
        <NewItemDialog
          items={this.props.items}
          catalogue={this.props.catalogue}
          onSubmit={(entry) => {this.props.onSubmit(entry)}}
        />
      </div>
    );
  }
}
export default App;
