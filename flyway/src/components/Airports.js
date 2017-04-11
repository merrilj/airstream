import React, { Component } from 'react'
import { Form, Radio, Input, Header, Image, Button, Modal, Grid, Segment } from 'semantic-ui-react'
import L from 'leaflet'
import IC from '../IC'
import $ from 'jquery'
import 'leaflet.polyline.snakeanim'
import axios from 'axios'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

export default class Airports extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      code: '',
      map: null,
      icon: null,
      smallIcon: null,
      popup: null,
      popupOptions: null,
      lat: null,
      lng: null,
      arrival: null,
      alreadyAddedError: null,
    }
  }


  state = { open: false }
  handleRadio = (e, { value }) => this.setState({ value })

  show = (size, dimmer) => () => this.setState({ size, dimmer, open: true })
  close = () => this.setState({ open: false })

  componentDidMount() {
    this.newMap()
  }


  handleChange(e) {
    let new_code = e.target.value
    this.setState({code: new_code})
    if (new_code.length === 3) {
      ic.api('airports', {code: new_code}, (error, response) => {
        if (response[0].icao.length > 1) {
        let data = response[0]
        let lat = data.lat
        let lng = data.lng
        this.setState({lat: lat})
        this.setState({lng: lng})
        let website
        if (data.website !== "") {
          website = data.website
        }
        let name = data.name
        if (name.includes('Airport') === false) {
          name = (name + ' Airport').toUpperCase()
        }

        let marker = L.marker([lat, lng], {icon: this.state.icon}).addTo(this.state.map)
        this.state.map.flyTo([lat, lng], 5)

        let airportPopup = $(`<div>
          <p id="airport-title">${name}</p></div>
        `)

        let button = $(`<button class="favorites-btn">Add to Favorites</button>`).click(() => {
          axios.post('http://localhost:4000/favorites', {
            name: name,
            code: new_code.toUpperCase()
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
            this.setState({alreadyAddedError: error})
          })
        })
        airportPopup.append(button)
        marker.bindPopup(airportPopup[0])
      }

      if (this.state.value === 'departure') {
      ic.api('timetable', {code: this.state.code, type: this.state.value}, (error, response) => {
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
              let popup = `<p id="leaflet-header">Flights from ${this.state.code.toUpperCase()} to ${data.code}</p>`
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
              let marker = L.marker([arrivalLat, arrivalLng], {icon: this.state.smallIcon}).addTo(this.state.map)
              marker.bindPopup(popup)

              let polyline = L.polyline([
                [this.state.lat, this.state.lng],
                [arrivalLat, arrivalLng]],
                {
                  color: 'teal',
                  weight: 2,
                  opacity: 0.7,
                })
              polyline.addTo(this.state.map).snakeIn()
            })
          })

      })
    } else {


      ic.api('timetable', {code: this.state.code, type: this.state.value}, (error, response) => {
        let flights = {}
        response.forEach((data) => {
          if (!flights[data.departure_code]) {
            flights[data.departure_code] = []
          }
          flights[data.departure_code].push(data)
        })

        let departureCode = []
        for (var key in flights) {
          departureCode.push(key)
        }

          ic.api('airports', {code: departureCode}, (error, response) => {
            response.forEach((data) => {
              let departureLat = data.lat
              let departureLng = data.lng
              let popup = `<p id="leaflet-header">Flights from ${data.code} to ${this.state.code.toUpperCase()}</p>`
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
              let marker = L.marker([departureLat, departureLng], {icon: this.state.smallIcon}).addTo(this.state.map)
              marker.bindPopup(popup)


              let polyline = L.polyline([
                [departureLat, departureLng],
                [this.state.lat, this.state.lng]],
                {
                  color: 'teal',
                  weight: 2,
                  opacity: 0.7,
                })
              polyline.addTo(this.state.map).snakeIn()
            })
          })

      })



    }

      })

    }

    if (new_code.length < 3) {
      this.state.map.flyTo([37.8, -96.9], 2)

    }

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
    const code = this.state.code
    const { open, size, dimmer } = this.state

    return (
      <div style={styles.div}>
        <div style={styles.inputBoxDiv}>
          <Input style={styles.inputBox} size='large' value={code} onChange={this.handleChange} type="text" icon='search' placeholder='Search by airport code...' />

          <Form>
            <Form.Field style={styles.formFields}>
              <Radio style={styles.radioLabel}
                label='Departures'
                name='radioGroup'
                value='departure'
                checked={this.state.value === 'departure'}
                onChange={this.handleRadio}
              />
            </Form.Field>
            <Form.Field>
              <Radio style={styles.radioLabel}
                label='Arrivals'
                name='radioGroup'
                value='arrival'
                checked={this.state.value === 'arrival'}
                onChange={this.handleRadio}
              />
            </Form.Field>
        </Form>
        </div>
        <div id="map" style={styles.map}></div>
      </div>
    )
  }
}

const styles = {
  div: {
    width: '100%'
  },

  map: {
    height: '80vh',
    width: '100%',
    marginTop: '0.8em',
  },

  inputBoxDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },

  radioLabel: {
    fontFamily: 'Work Sans, sans-serif',
    transform: 'scale(1.5)',
    paddingLeft: '3em',
    paddingRight: '2em',
    display: 'flex',

  },

  formFields: {
    display: 'flex',
    flexDirection: 'row',

  }
}
