import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Header, Button, Dropdown, Menu, Icon } from 'semantic-ui-react'

class App extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div>

        <div>
        <Menu size='huge'>
          <Header style={styles.header} size='large'>airstream</Header>

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
            <Button primary animated>
              <Button.Content visible>Sign Up</Button.Content>
              <Button.Content hidden>Sign In</Button.Content>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
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
}


export default App
