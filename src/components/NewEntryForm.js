import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

const styles = {
  wrapper: {
    overflow: "hidden",
    margin: "20px",
    padding: "20px"
  },
  button: {
    marginTop: "20px",
    float: "right"
  }
};

export default () => {
  return (
    <Paper zDepth={1} style={styles.wrapper}>
      <DatePicker fullWidth={true} floatingLabelText="Date" defaultDate={new Date()} />
      <TextField fullWidth={true} floatingLabelText="Weight (kg)" />
      <TextField fullWidth={true} floatingLabelText="Fat (%)" />
      <TextField fullWidth={true} floatingLabelText="Waist (cm)" />
      <RaisedButton label="Submit" primary={true} style={styles.button} />
    </Paper>
  );
};
