import React, { Component } from 'react'
import { Button, List, Image } from 'semantic-ui-react'
import axios from 'axios'

export default class Favorites extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }





  render() {
    return (
      <div>
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content floated='right'>
              <Button>Add</Button>
            </List.Content>
            <Image avatar src='http://www.iconninja.com/files/566/27/661/airport-icon.svg' />
            <List.Content>
              What now?
            </List.Content>
          </List.Item>
        </List>
      </div>
    )
  }
}

const styles = {

}
