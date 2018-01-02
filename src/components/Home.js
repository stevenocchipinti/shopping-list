import React, {Component} from 'react'
import background from './../assets/images/background.jpg'
import {Link, Redirect} from 'react-router-dom'
import {generateListName} from '../backend'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: window.localStorage.getItem('listName'),
    }
  }

  render() {
    const styles = {
      container: {
        background: `
          linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.8)),
          url(${background}) no-repeat 50% fixed
        `,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100vh',
      },
      heading: {
        color: 'white',
        fontSize: '75px',
        textAlign: 'center',
        lineHeight: 1.5,
      },
      cta: {
        color: 'white',
        textDecoration: 'none',
        border: '3px solid white',
        borderRadius: 10,
        fontSize: '30px',
        padding: 30,
      },
    }

    return (
      <main style={styles.container}>
        <h1 style={styles.heading}>Shopping List</h1>
        <Link to={`/list/${generateListName()}`} style={styles.cta}>
          Get Started
        </Link>
        {this.state.listName && (
          <Redirect to={`/list/${this.state.listName}`} />
        )}
      </main>
    )
  }
}
