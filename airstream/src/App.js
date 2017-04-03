import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Dropdown, Menu, Icon } from 'semantic-ui-react'

class App extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div className="App">

        <Menu size='huge'>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />

        <Menu.Menu position='right'>
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

        <div className="App-header">
          <h2>airstream</h2>
        </div>
        <div>
          <Button primary animated>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
            </Button.Content>
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
