import React, { Component } from 'react'
import { Modal, Header, Button, List, Image } from 'semantic-ui-react'
import axios from 'axios'

export default class Favorites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      favorites: []
    }
  }

  state = { open: false }

  show = (dimmer, size) => () => this.setState({ dimmer, size: 'large', open: true })
  close = () => this.setState({ open: false })

  queryFavorites() {
    axios.get('http://localhost:4000/favorites').then((data) => {
      this.setState({favorites: data.data})
    })
  }

  removeFavorites(index) {
    axios.delete('http://localhost:4000/favorites/' + this.state.favorites[index].code)
    .then((response) => {
      this.queryFavorites()
    })
    .catch((error) => {
      console.log(error)
      this.setState({alreadyAddedError: error})
    })
  }

  componentDidMount() {
    this.queryFavorites()
  }


  render() {
    const { open, dimmer, size } = this.state

    return (
      <div>
      <List style={styles.listColumn} divided verticalAlign='middle'>
        {this.state.favorites.map((airport, index) => (
          <List.Item style={styles.listItem} key={airport.id}>
            <List.Content floated='right'>
              <Button icon='plane' inverted color='blue' onClick={this.show('blurring')}></Button>
              <Button icon='cancel' onClick={this.removeFavorites.bind(this, index)} inverted color='red'></Button>
            </List.Content>
            <Image avatar style={styles.image} src='http://www.johngedeon.com/Tower-icon.jpg' />
            <List.Content style={styles.listContent}>
              <List.Header style={styles.listHeader}>{airport.name}</List.Header>
              Known as {airport.code}
            </List.Content>
          </List.Item>
        ))}
      </List>



      <Modal dimmer={dimmer} size={size} open={open} onClose={this.close}>
        <Modal.Header>Flights from Such and Such</Modal.Header>
        <Modal.Content image>

        </Modal.Content>
        <Modal.Actions>
          <Button icon='cancel' color='teal' labelPosition='right' content="Close" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    </div>
    )
  }
}

const styles = {
  listColumn: {
    margin: '0 auto',
    alignItems: 'center',

  },
  image: {
    width: '4em',
    height: '4em',
  },
  listHeader: {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.1em',
    padding: '0'
  },
  listContent: {
    fontFamily: 'Work Sans, sans-serif',

  },
  listItem: {
  }
}
