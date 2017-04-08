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
        <Menu size='huge'>
          <Header style={styles.header} size='large'>flyway</Header>

        <Menu.Menu position='right'>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />

          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button color='teal' animated>
              <Button.Content visible>Sign In</Button.Content>
              <Button.Content hidden>or Sign Up</Button.Content>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </div>

      <div>
        <Container>
          <Nearby />
        </Container>
      </div>
      </div>
    )
  }
}

const styles = {
  header: {
    display: 'flex',
    paddingTop: '0.5em',
    paddingLeft: '0.5em',
  },

  container: {
    padding: '2em',
    width: '95%',
  }
}
