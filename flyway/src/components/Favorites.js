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
      currentAirport: {}

    }
  }

  state = { open: false }

  show = (airport, dimmer, size) => () => {
    this.setState({ dimmer, size, open: true })
    this.setState({currentAirport: airport})
    setTimeout(() => {
      this.newMap()
    }, 0)
  }
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
    //this.newMap()
  }

  newMap() {
    var newMap = new L.Map("map", {center: [37.8, -96.9], zoom: 2})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(newMap);

    var airportIcon = L.icon({
      iconUrl: 'https://cdn3.iconfinder.com/data/icons/map/500/airport-512.png',
      iconSize: [30, 35],
    })

    var arrivalIcon = L.icon({
      iconUrl: 'https://cdn3.iconfinder.com/data/icons/basicolor-transportation/24/264_airport_flight_arrival-512.png',
      iconSize: [15, 15],
    })

    let airportCode = this.state.currentAirport.code
    ic.api('airports', {code: airportCode}, (error, response) => {
      let data = response[0]
      let lat = data.lat
      let lng = data.lng

      let marker = L.marker([lat, lng], {icon: airportIcon}).addTo(newMap)
      newMap.flyTo([lat, lng], 5)

      ic.api('timetable', {code: airportCode, type: 'departure'}, (error, response) => {
        let flights = {}
        response.forEach((data) => {
          if (!flights[data.arrival_code]) {
            flights[data.arrival_code] = []
          }
          flights[data.arrival_code].push(data)
        })

        let arrivalCode = []
        for (var key in flights) {
          arrivalCode.push(key)
        }

        ic.api('airports', {code: arrivalCode}, (error, response) => {
          response.forEach((data) => {
            let arrivalLat = data.lat
            let arrivalLng = data.lng
            let popup = `<p id="leaflet-header">Flights from ${airportCode} to ${data.code}</p>`
              flights[data.code].forEach((flight) => {
                popup += `<p id="flight-number">${flight.flight.airline_name} ${flight.flight.number}</p>`
                if (flight.flight.aircraft_code !== undefined) {
                  popup += `<p id="aircraft">${flight.flight.aircraft_code} Aircraft</p>`
                }
                if (flight.departure_time !== undefined) {
                  let departing = flight.departure_time.substring(0, 16).replace(/T/i, ' at ')
                  popup += `<p id="flight-times">Departing ${departing}</p>`
                } else {
                  popup += `<p id="flight-times">Private Flight</p>`
                }
                if (flight.departure_time !== undefined) {
                  let arriving = flight.arrival_time.substring(0, 16).replace(/T/i, ' at ')
                  popup += `<p id="flight-times">Arriving ${arriving}</p>`
                }
                if (flight.status === 'cancelled') {
                  popup += `<p id="flight-status-cancelled"> ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
                }
                if (flight.status === 'flight') {
                  popup += `<p id="flight-status"> In ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
                }
                if (flight.status !== 'flight' && flight.status !== 'cancelled') {
                  popup += `<p id="flight-status"> ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
                }

              })
              let arrivalMarker = L.marker([arrivalLat, arrivalLng], {icon: arrivalIcon}).addTo(newMap)
              arrivalMarker.bindPopup(popup)

              let polyline = L.polyline([
                [lat, lng],
                [arrivalLat, arrivalLng]],
                {
                  color: 'teal',
                  weight: 2,
                  opacity: 0.7,
                })
              polyline.addTo(newMap).snakeIn()
            })
          })
        })
      })
  }


  render() {
    const { open, dimmer, size } = this.state

    return (
      <div>
      <List style={styles.listColumn} divided verticalAlign='middle'>
        {this.state.favorites.map((airport, index) => (
          <List.Item style={styles.listItem} key={airport.id}>
            <List.Content floated='right'>
              <Button icon='plane' inverted color='blue' onClick={this.show(airport, 'blurring', 'large')}></Button>
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
        <Modal.Header>{this.state.currentAirport.name}</Modal.Header>
        <Modal.Content image>
          <div id="map" style={styles.newMap}></div>
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
  },
  newMap: {
    height: '80vh',
    width: '100%',
    marginTop: '0.8em',
  }
}
