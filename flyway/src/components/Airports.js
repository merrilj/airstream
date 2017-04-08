import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import L from 'leaflet'
import IC from 'iatacodes'

import 'leaflet.polyline.snakeanim'
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
      lng: null
    }
  }

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
        let phone
        if (data.phone.length !== undefined) {
          phone = data.phone
        }
        let website
        if (data.website.length !== undefined) {
          website = data.website
        }
        let name = data.name
        if (name.includes('Airport') === false) {
          name = (name + ' Airport').toUpperCase()
        }

        let marker = L.marker([lat, lng], {icon: this.state.icon}).addTo(this.state.map)
        this.state.map.flyTo([lat, lng], 4)

        marker.bindPopup(`
          <b>${name}</b>
          <br>${phone}
          <br><button id="popup-btn"><a href=${website} target="_blank">Visit Our Website</a></button>
          <button id="popup-btn">See Flights</button>
        `)
      }
      })

      ic.api('timetable', {code: new_code, type: 'departure'}, (error, response) => {
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
              let popup = `<div class="leaflet-popup-content"><h3 class="leaflet-header">Flights from ${new_code.toUpperCase()} to ${data.code}</h3></div>`
              flights[data.code].forEach((flight) => {
                popup += `<p id="flight-number">${flight.flight.airline_name} ${flight.flight.number}</p>`
                if (flight.flight.aircraft_code !== undefined) {
                  popup += `<p id="aircraft">${flight.flight.aircraft_code} Aircraft</p>`
                }
                if (flight.departure_time !== undefined) {
                  popup += `<p id="flight-times">Departing ${flight.departure_time}</p>`
                } else {
                  popup += `<p id="flight-times">Private Flight</p>`
                }
                if (flight.departure_time !== undefined) {
                  popup += `<p id="flight-times">Arriving ${flight.arrival_time}</p>`
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

    return (
      <div>
        <Input size='large' value={code} onChange={this.handleChange} type="text" icon='search' placeholder='Search for airport...' />
        <div id="map" style={styles.map}></div>
      </div>
    )
  }
}

const styles = {
  map: {
    height: '80vh',
    width: '100%',
  }
}
