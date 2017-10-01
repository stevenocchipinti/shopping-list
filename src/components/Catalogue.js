import React, { Component } from "react";

import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      paper: {
        margin: 10,
        padding: 10
      }
    };
  }

  entries() {
    return Object.keys(this.props.catalogue).map(key => {
      return <li>{`${key} => ${this.props.catalogue[key]}`}</li>;
    });
  }

  render() {
    const data = JSON.stringify(this.props.catalogue, true, 4);
    return (
      <Paper style={this.styles.paper}>
        <TextField
          id="catalogue"
          multiLine={true}
          underlineShow={false}
          value={data}
        />
      </Paper>
    );
  }
}
export default Catalogue;
