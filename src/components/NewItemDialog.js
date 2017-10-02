import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAddIcon from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import AutoComplete from "material-ui/AutoComplete";

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
    this.defaults = {
      item: "",
      section: "",
      itemError: "",
      actionLabel: "Add",
      actionDisabled: true
    };
    this.state = {
      ...this.defaults,
      open: false
    };
  }

  handleOpen() {
    this.setState({...this.defaults, open: true});
  }

  handleClose() {
    this.setState({ open: false });
  }

  format(string) {
    const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`;
    return string.trim().split(/\s+/).map(capitalize).join(" ");
  }

  handleSubmit() {
    this.props.onSubmit({
      item: this.format(this.state.item),
      section: this.format(this.state.section)
    });
    this.setState(this.defaults);
  }

  update(changes) {
    let newState = {
      ...this.defaults,
      item: this.state.item,
      section: this.state.section,
      ...changes
    };

    const itemOnList = this.props.items.find(i => i.label === newState.item)
    const storedSection = this.props.catalogue[newState.item];

    if (newState.item.trim().length > 0) { newState.actionDisabled = false; }
    if (changes.item && storedSection) { newState.section = storedSection; }

    if (itemOnList && newState.section !== storedSection) { 
      newState.actionLabel = "Move";
    } else if (itemOnList && newState.section === storedSection) {
      if (itemOnList.done) {
        newState.actionLabel = "Uncheck";
        newState.actionDisabled = false;
      } else {
        newState.actionLabel = "Already exists!";
        newState.actionDisabled = true;
      }
    }
    this.setState(newState);
  }

  handleItemChange(item) {
    this.update({item});
  }

  handleSectionChange(section) {
    this.update({section});
  }

  render() {
    const actions = [
      <FlatButton
        label="done"
        onTouchTap={() => this.setState({ open: false })}
      />,
      <RaisedButton
        label={this.state.actionLabel}
        disabled={this.state.actionDisabled}
        primary={true}
        onTouchTap={() => this.handleSubmit()}
      />
    ];

    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpen()}
          style={styles.floatingButton}
          >
          <ContentAddIcon />
        </FloatingActionButton>

        <Dialog
          title="Add Items"
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
          actions={actions}
        >
          <AutoComplete
            floatingLabelText="Item"
            fullWidth={true}
            filter={AutoComplete.fuzzyFilter}
            dataSource={Object.keys(this.props.catalogue)}
            maxSearchResults={5}
            onUpdateInput={item => this.handleItemChange(item)}
            searchText={this.state.item}
            errorText={this.state.itemError}
            ref="itemField"
          />
          <AutoComplete
            floatingLabelText="Section"
            fullWidth={true}
            filter={AutoComplete.fuzzyFilter}
            dataSource={Array.from(new Set(Object.values(this.props.catalogue)))}
            maxSearchResults={5}
            onUpdateInput={section => this.handleSectionChange(section)}
            searchText={this.state.section}
          />
        </Dialog>
      </div>
    );
  }
}
