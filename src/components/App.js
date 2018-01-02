import React, {Component} from 'react'

import Backend from '../backend'
import {registerServiceWorker} from '../registerServiceWorker'

import AppBar from './AppBar'
import ShoppingLists from './ShoppingLists'

import Snackbar from 'material-ui/Snackbar'

class App extends Component {
  constructor() {
    super()
    this.backend = null
    this.state = {
      items: [],
      catalogue: {},
      notification: {message: '', visible: false},
      loading: true,
      offline: !navigator.onLine,
    }
  }

  componentDidMount() {
    window.addEventListener('online', () => {
      this.notify('Connected to server!')
      this.setState({...this.state, offline: false})
    })
    window.addEventListener('offline', () => {
      this.notify('Disconnected from server!')
      this.setState({...this.state, offline: true})
    })
    window.localStorage.setItem('listName', this.props.match.params.listId)

    registerServiceWorker({
      onInstall: () => this.notify('Now available offline'),
      onUpdate: () => this.notify('Refresh for the new version'),
    })

    this.backend = new Backend(this.props.match.params.listId, {
      onItemsChanged: items => {
        this.setState({items, loading: false})
      },
      onCatalogueChanged: catalogue => {
        this.setState({catalogue, loading: false})
      },
    })
  }

  notify(message) {
    this.setState({notification: {message, visible: true}})
  }
  hideNotification() {
    this.setState({notification: {message: '', visible: false}})
  }

  render() {
    return (
      <div>
        <AppBar
          sweepItems={() => this.backend.handleSweep()}
          loading={this.state.user && this.state.loading}
          offline={this.state.offline}
        />

        <ShoppingLists
          handleMark={item => this.backend.handleMark(item)}
          items={this.state.items}
          catalogue={this.state.catalogue}
          onSubmit={entry => this.backend.handleAdd(entry.item, entry.section)}
        />

        <Snackbar
          open={this.state.notification.visible}
          message={this.state.notification.message}
          style={{textAlign: 'center'}}
          autoHideDuration={3000}
          onRequestClose={() => {
            this.hideNotification()
          }}
        />
      </div>
    )
  }
}
export default App
