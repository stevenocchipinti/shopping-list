import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

const styles = {
  wrapper: {
    overflow: "hidden",
    margin: "20px",
    padding: "20px"
  },
  submitButton: {
    marginTop: "20px",
    float: "right"
  },
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1
  }
};

export default class NewCheckinDialog extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      date: new Date(),
      weight: "",
      fat: "",
      waist: ""
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    this.handleClose();
    this.props.onSubmit({
      date: this.state.date,
      weight: this.state.weight,
      fat: this.state.fat,
      waist: this.state.waist
    });
  }

  render() {
    return (
      <div>
        <FloatingActionButton style={styles.floatingButton}>
          <ContentAdd onTouchTap={ () => this.handleOpen() }/>
        </FloatingActionButton>

        <Dialog
          title="Add New Checkin"
          open={this.state.open}
          onRequestClose={ () => this.handleClose() }
        >

          <DatePicker
            fullWidth={true}
            floatingLabelText="Date"
            value={this.state.date}
            onChange={ (e, date) => this.setState({date}) }
          />
          <TextField
            type="tel"
            fullWidth={true}
            floatingLabelText="Weight (kg)"
            value={this.state.weight}
            onChange={ (e, weight) => this.setState({weight}) }
          />
          <TextField
            type="tel"
            fullWidth={true}
            floatingLabelText="Fat (%)"
            value={this.state.fat}
            onChange={ (e, fat) => this.setState({fat}) }
          />
          <TextField
            type="tel"
            fullWidth={true}
            floatingLabelText="Waist (cm)"
            value={this.state.waist}
            onChange={ (e, waist) => this.setState({waist}) }
          />
          <RaisedButton
            label="Submit"
            primary={true}
            style={styles.submitButton}
            onTouchTap={ () => this.handleSubmit() }
          />

        </Dialog>
      </div>
    );
  }
}
