import React, { Component } from 'react'
import { Button, List, Image } from 'semantic-ui-react'
import axios from 'axios'

export default class Favorites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      favorites: []
    }
  }

  queryFavorites() {
    axios.get('http://localhost:4000/favorites').then((data) => {
      this.setState({favorites: data.data})
    })
  }

  componentDidMount() {
    this.queryFavorites()
  }


  render() {
    return (
      <div>
      <List style={styles.listColumn} divided verticalAlign='middle'>
        <List.Item>
          <List.Content floated='right'>
            <Button>Remove</Button>
          </List.Content>
          <Image avatar src='/assets/images/avatar/small/lena.png' />
          <List.Content>
            Lina
          </List.Content>
        </List.Item>
      </List>


        {this.state.favorites.map((airport, index) => (
          <p key={airport.id}>{airport.name} with airport code of {airport.code}</p>
        ))}
        </div>
    )
  }
}

const styles = {
  listColumn: {
    margin: '0 auto',
    alignItems: 'center'
  }
}
