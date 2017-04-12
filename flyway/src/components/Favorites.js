import React, { Component } from 'react'
import { Modal, Header, Button, List, Image } from 'semantic-ui-react'
import axios from 'axios'
import L from 'leaflet'
import IC from '../IC'
import $ from 'jquery'
import 'leaflet.polyline.snakeanim'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

export default class Favorites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      favorites: [],
      map: null,
      icon: null,
      smallIcon: null,

    }
  }

  state = { open: false }

  show = (dimmer, size) => () => this.setState({ dimmer, size: 'large', open: true })
  close = () => this.setState({ open: false })

  queryFavorites() {
    axios.get('https://mighty-hamlet-57380.herokuapp.com/favorites').then((data) => {
      this.setState({favorites: data.data})
    })
  }

  removeFavorites(index) {
    axios.delete('https://mighty-hamlet-57380.herokuapp.com/favorites/' + this.state.favorites[index].code)
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
    // this.newMap()
  }

  newMap() {
    var newMap = new L.Map("map", {center: [37.8, -96.9], zoom: 2})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(newMap);

   this.setState({map: newMap})

   var airportIcon = L.icon({
     iconUrl: 'https://cdn3.iconfinder.com/data/icons/map/500/airport-512.png',
     iconSize: [30, 35],
   })

   this.setState({icon: airportIcon})

   var arrivalIcon = L.icon({
     iconUrl: 'https://cdn3.iconfinder.com/data/icons/basicolor-transportation/24/264_airport_flight_arrival-512.png',
     iconSize: [15, 15],
   })

   this.setState({smallIcon: arrivalIcon})

  }


  render() {
    const { open, dimmer, size } = this.state

    return (
      <div>
      <List style={styles.listColumn} divided verticalAlign='middle'>
        {this.state.favorites.map((airport, index) => (
          <List.Item style={styles.listItem} key={airport.id}>
            <List.Content styles={styles.listButtons} floated='right'>
              <Button icon='plane' inverted color='blue' onClick={this.show('blurring', 'large')}></Button>
              <Button icon='cancel' onClick={this.removeFavorites.bind(this, index)} inverted color='red'></Button>
            </List.Content>
            <Image avatar style={styles.image} src='http://www.johngedeon.com/Tower-icon.jpg' />
            <List.Content style={styles.listContent}>
              <List.Header style={styles.listHeader}>{airport.name}</List.Header>
              Search by {airport.code}
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
    fontSize: '1.2em',
    padding: '0',
    paddingBottom: '0.4em'
  },
  listContent: {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.2em',
  },
  listItem: {
  },
  listButtons: {
    position: 'absolute',
    alignItems: 'center'
  }
}
