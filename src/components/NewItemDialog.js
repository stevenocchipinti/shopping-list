import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AutoComplete from 'material-ui/AutoComplete'

const styles = {
  wrapper: {
    overflow: 'hidden',
    margin: '20px',
    padding: '20px',
  },
  submitButton: {
    marginTop: '20px',
    float: 'right',
  },
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1,
  },
}

export default class NewCheckinDialog extends Component {
  constructor() {
    super()
    this.defaults = {
      item: '',
      section: '',
      itemError: '',
      actionLabel: 'Add',
      actionDisabled: true,
    }
    this.state = {
      ...this.defaults,
      open: false,
    }
  }

  handleOpen() {
    this.setState({...this.defaults, open: true}, () => this.focus())
  }

  handleClose() {
    this.setState({open: false})
  }

  // TODO: Move this out to the helpers
  format(string) {
    if (!string) return ''
    const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`
    return string
      .trim()
      .split(/\s+/)
      .map(capitalize)
      .join(' ')
  }

  focus() {
    this.autoCompleteInput.refs.searchTextField.input.focus()
  }

  handleSubmit() {
    this.props.onSubmit({
      item: this.format(this.state.item),
      section: this.format(this.state.section),
    })
    this.setState(this.defaults, () => this.focus())
  }

  update(changes) {
    let newState = {
      ...this.defaults,
      item: this.state.item,
      section: this.state.section,
      ...changes,
    }

    const itemOnList = this.props.items.find(i => i.name === newState.item)
    const catalogueEntry = Object.values(this.props.catalogue).find(
      e => e.name === newState.item,
    )
    const storedSection = catalogueEntry && catalogueEntry.section

    if (newState.item.trim().length > 0) {
      newState.actionDisabled = false
    }
    if (changes.item && storedSection) {
      newState.section = storedSection
    }

    if (itemOnList && newState.section !== storedSection) {
      newState.actionLabel = 'Move'
    } else if (itemOnList && newState.section === storedSection) {
      if (itemOnList.done) {
        newState.actionLabel = 'Uncheck'
        newState.actionDisabled = false
      } else {
        newState.actionLabel = 'Already exists!'
        newState.actionDisabled = true
      }
    }
    this.setState(newState)
  }

  handleItemChange(item) {
    this.update({item})
  }

  handleSectionChange(section) {
    this.update({section})
  }

  render() {
    const catalogueEntries = Object.values(this.props.catalogue)
    const allItems = catalogueEntries.map(e => e.name)
    const allSections = catalogueEntries.map(e => e.section).filter(x => x)

    const actions = [
      <FlatButton
        label="done"
        onTouchTap={() => this.setState({open: false})}
        tabIndex={4}
      />,
      <RaisedButton
        label={this.state.actionLabel}
        disabled={this.state.actionDisabled}
        primary={true}
        onTouchTap={() => this.handleSubmit()}
        tabIndex={3}
      />,
    ]

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
            ref={input => (this.autoCompleteInput = input)}
            floatingLabelText="Item"
            fullWidth={true}
            filter={AutoComplete.fuzzyFilter}
            dataSource={Array.from(new Set(allItems))}
            maxSearchResults={5}
            onUpdateInput={item => this.handleItemChange(item)}
            searchText={this.state.item}
            errorText={this.state.itemError}
            tabIndex={1}
          />
          <AutoComplete
            floatingLabelText="Section"
            fullWidth={true}
            filter={AutoComplete.fuzzyFilter}
            dataSource={Array.from(new Set(allSections))}
            maxSearchResults={5}
            onUpdateInput={section => this.handleSectionChange(section)}
            searchText={this.state.section}
            tabIndex={2}
          />
        </Dialog>
      </div>
    )
  }
}
