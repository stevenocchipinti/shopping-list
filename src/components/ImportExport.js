import React, { Component } from "react";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class ImportExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.stringify({...props.data}, false, 2)
    }
    this.styles = {
      paper: {
        margin: 10,
        padding: 10
      }
    };
  }

  render() {
    return (
      <Paper style={this.styles.paper}>
        <p style={{ marginTop: 0 }}>
          Below is an export of your data! Replace the data below with new
          data and press import to make a change.
        </p>
        <TextField
          id="catalogue"
          multiLine={true}
          rowsMax={12}
          fullWidth={true}
          value={this.state.data}
          onChange={e => this.setState({data: e.target.value})}
          underlineShow={false}
          style={{
            backgroundColor: "#333",
            borderRadius: 3,
            marginBottom: 20
          }}
          textareaStyle={{
            color: "#ddd",
            fontSize: "12px",
            lineHeight: "12px",
            fontFamily: "monospace",
            margin: 10
          }}
        />
        <RaisedButton
          label="Import Data"
          primary={true}
          fullWidth={true}
          onClick={e => this.props.onImport(JSON.parse(this.state.data))}
        />
      </Paper>
    );
  }
}
export default ImportExport;
