import React, { Component } from "react"

import NewItemDialog from "./NewItemDialog"
import { slugify } from "../helpers"

import Paper from "material-ui/Paper"
import Chip from "./Chip"

class App extends Component {
  constructor(props) {
    super(props)
    this.styles = {
      heading: {},
      paper: {
        margin: 10,
        padding: 10,
      },
      wrapper: {
        display: "flex",
        flexWrap: "wrap",
      },
    }
  }

  itemsBySection() {
    return this.props.items.reduce((a, item) => {
      const catalogueEntry = this.props.catalogue[slugify(item.name)]
      const section = catalogueEntry ? catalogueEntry.section : ""
      if (Array.isArray(a[section])) {
        a[section].push(item)
      } else {
        a[section] = [item]
      }
      return a
    }, {})
  }

  renderItemsFor(section) {
    const notDone = section.filter(i => !i.done).sort()
    const done = section.filter(i => i.done).sort()
    return notDone.concat(done).map((item, index) => {
      return (
        <Chip
          key={index}
          onClick={() => this.props.handleMark(item)}
          qty={item.quantity}
          done={item.done}
        >
          {item.name}
        </Chip>
      )
    })
  }

  renderSections() {
    const data = this.itemsBySection()

    const notDone = Object.keys(data)
      .filter(section => data[section].some(item => !item.done))
      .sort()
    const done = Object.keys(data)
      .filter(section => data[section].every(item => item.done))
      .sort()

    return notDone.concat(done).map((section, index) => {
      return (
        <Paper key={index} style={this.styles.paper}>
          {section && <h2>{section}</h2>}
          <div style={this.styles.wrapper}>
            {this.renderItemsFor(data[section])}
          </div>
        </Paper>
      )
    })
  }

  render() {
    return (
      <div style={{ marginBottom: 100 }}>
        {this.renderSections()}
        <NewItemDialog
          items={this.props.items}
          catalogue={this.props.catalogue}
          onSubmit={entry => {
            this.props.onSubmit(entry)
          }}
        />
      </div>
    )
  }
}
export default App
