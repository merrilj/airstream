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
    axios.get('https://mighty-hamlet-57380.herokuapp.com').then((data) => {
      this.setState({favorites: data.data})
    })
  }

  removeFavorites(index) {
    axios.delete('https://mighty-hamlet-57380.herokuapp.com/' + this.state.favorites[index].code)
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










//   getFlights(index) {
//     let new_code = this.state.favorites[index].code
//   ic.api('airports', {code: new_code}, (error, response) => {
//     if (response[0].icao.length > 1) {
//     let data = response[0]
//     let lat = data.lat
//     let lng = data.lng
//     this.setState({lat: lat})
//     this.setState({lng: lng})
//     let website
//     if (data.website !== "") {
//       website = data.website
//     }
//     let name = data.name
//     if (name.includes('Airport') === false) {
//       name = (name + ' Airport').toUpperCase()
//     }
//
//     let marker = L.marker([lat, lng], {icon: this.state.icon}).addTo(this.state.map)
//     this.state.map.flyTo([lat, lng], 5)
//
//     let airportPopup = $(`<div>
//       <p id="airport-title">${name}</p></div>
//     `)
//
//     let button = $(`<button class="favorites-btn">Add to Favorites</button>`).click(() => {
//       axios.post('http://localhost:4000/favorites', {
//         name: name,
//         code: new_code.toUpperCase()
//       })
//       .then((response) => {
//         console.log(response)
//       })
//       .catch((error) => {
//         console.log(error)
//         this.setState({alreadyAddedError: error})
//       })
//     })
//     airportPopup.append(button)
//     marker.bindPopup(airportPopup[0])
//   }
//
//   if (this.state.value === 'departure') {
//   ic.api('timetable', {code: this.state.code, type: this.state.value}, (error, response) => {
//     let flights = {}
//     response.forEach((data) => {
//       if (!flights[data.arrival_code]) {
//         flights[data.arrival_code] = []
//       }
//       flights[data.arrival_code].push(data)
//     })
//
//     let arrivalCode = []
//     for (var key in flights) {
//       arrivalCode.push(key)
//     }
//
//       ic.api('airports', {code: arrivalCode}, (error, response) => {
//         response.forEach((data) => {
//           let arrivalLat = data.lat
//           let arrivalLng = data.lng
//           let popup = `<p id="leaflet-header">Flights from ${this.state.code.toUpperCase()} to ${data.code}</p>`
//           flights[data.code].forEach((flight) => {
//             popup += `<p id="flight-number">${flight.flight.airline_name} ${flight.flight.number}</p>`
//             if (flight.flight.aircraft_code !== undefined) {
//               popup += `<p id="aircraft">${flight.flight.aircraft_code} Aircraft</p>`
//             }
//             if (flight.departure_time !== undefined) {
//               let departing = flight.departure_time.substring(0, 16).replace(/T/i, ' at ')
//               popup += `<p id="flight-times">Departing ${departing}</p>`
//             } else {
//               popup += `<p id="flight-times">Private Flight</p>`
//             }
//             if (flight.departure_time !== undefined) {
//               let arriving = flight.arrival_time.substring(0, 16).replace(/T/i, ' at ')
//               popup += `<p id="flight-times">Arriving ${arriving}</p>`
//             }
//             if (flight.status === 'cancelled') {
//               popup += `<p id="flight-status-cancelled"> ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
//             }
//             if (flight.status === 'flight') {
//               popup += `<p id="flight-status"> In ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
//             }
//             if (flight.status !== 'flight' && flight.status !== 'cancelled') {
//               popup += `<p id="flight-status"> ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
//             }
//
//           })
//           let marker = L.marker([arrivalLat, arrivalLng], {icon: this.state.smallIcon}).addTo(this.state.map)
//           marker.bindPopup(popup)
//
//           let polyline = L.polyline([
//             [this.state.lat, this.state.lng],
//             [arrivalLat, arrivalLng]],
//             {
//               color: 'teal',
//               weight: 2,
//               opacity: 0.7,
//             })
//           polyline.addTo(this.state.map).snakeIn()
//         })
//       })
//
//   })
// }


















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
