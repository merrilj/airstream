import React, { Component } from 'react'
import './App.css'
import { Header, Container, Button, Dropdown, Menu } from 'semantic-ui-react'
import Flights from './components/Flights'
import Airports from './components/Airports'
import Welcome from './components/Welcome'
import Userdash from './components/Userdash'
import Nearby from './components/Nearby'

export default class App extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div>

        <div>
        <Menu size='huge' style={styles.navBar}>
          <Header style={styles.header} size='large'>flyway</Header>


            <Button style={styles.signIn} color='teal' animated>
              <Button.Content visible>Sign In</Button.Content>
              <Button.Content hidden>or Sign Up</Button.Content>
            </Button>

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

let imgUrl = 'http://wallpapercave.com/wp/AGAQ0Vy.jpg'

const styles = {
  header: {

    paddingTop: '0.3em',
    paddingLeft: '0.5em',
    fontFamily: 'Electrolize, sans-serif',
    fontSize: '2.5em',
    fontStyle: 'italic',
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

  signIn: {
    float: 'left'
  }

}
