import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export default props => {
  return (
    <Paper zDepth={1} style={{ overflow: "hidden", margin: "20px", padding: "20px" }}>
      <DatePicker fullWidth={true} floatingLabelText="Date" defaultDate={new Date()} />
      <TextField fullWidth={true} floatingLabelText="Middle name" />
      <TextField fullWidth={true} floatingLabelText="Last name" />
      <TextField fullWidth={true} floatingLabelText="Email address" />
      <RaisedButton label="Submit" primary={true} style={{ marginTop: "20px", float: "right" }} />
    </Paper>
  );
}
