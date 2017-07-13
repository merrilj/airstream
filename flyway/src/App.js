import React, { Component } from 'react'
import { Header, Container, Menu } from 'semantic-ui-react'

import './App.css'
import Userdash from './components/Userdash'

export default class App extends Component {
  state = { activeItem: 'home' }

  render() {
    return (
      <div>
        <div>
          <Menu size='huge' style={styles.navBar}>
            <Header style={styles.header} size='large'>flyway</Header>
          </Menu>
        </div>
        <div>
          <Container>
            <Userdash />
          </Container>
        </div>
      </div>
    )
  }
}

const styles = {
  header: {
    color: 'gray',
    paddingTop: '0.3em',
    paddingLeft: '0.5em',
    fontFamily: 'Electrolize, sans-serif',
    fontSize: '2.5em',
    fontStyle: 'italic',
    paddingBottom: '0.3em',
    marginBottom: '0'
  },
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: '2em',
    width: '95%',
  },
  signOut: {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: 'gray'
  }
}
