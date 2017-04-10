import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import L from 'leaflet'
import IC from '../IC'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

export default class Nearby extends Component {
  constructor(props) {
    super(props)

    this.nearby = this.nearby.bind(this)

    this.state = {}
  }

  componentDidMount() {
    this.nearby()
  }

  nearby() {

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

    var meIcon = L.icon({
      iconUrl: 'http://www.clipartkid.com/images/250/my-favorite-cliparts-ScFfFE-clipart.png',
      iconSize: [30, 35],
    })

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var lng = position.coords.longitude
      // console.log(lat, lng)
    ic.api('nearby', {lat: lat, lng: lng, distance: 150}, function(error, response) {
      response.forEach((data) => {
        if (data.type === 'airport' && data.icao.length > 1) {
          let latitude = data.lat
          let longitude = data.lng
          let code = data.code
          // console.log(latitude, longitude)
          // this.setState({lat: latitudes})
          // this.setState({lng: longitudes})
          let name = data.name
          if (!name.includes('Airport')) {
            name = (name + ' Airport').toUpperCase()
          }

          let meMarker = L.marker([lat, lng], {icon: meIcon}).addTo(newMap)
          newMap.flyTo([lat, lng], 8)

          let nearbyMarker = L.marker([latitude, longitude], {icon: airportIcon}).addTo(newMap)

          nearbyMarker.bindPopup(`
            <b>${name}</b>
            <button id="popup-btn" onClick="">See Flights</button>
          `)
        }
      })
      })
    })
  }





  // ic.api('timetable', {code: code, type: 'departure'}, (error, response) => {
  //   let flights = {}
  //   response.forEach((data) => {
  //     if (!flights[data.arrival_code]) {
  //       flights[data.arrival_code] = []
  //     }
  //     flights[data.arrival_code].push(data)
  //   })
  //
  //   let arrivalCode = []
  //   for (var key in flights) {
  //     arrivalCode.push(key)
  //   }
  //
  //     ic.api('airports', {code: arrivalCode}, (error, response) => {
  //       response.forEach((data) => {
  //         let arrivalLat = data.lat
  //         let arrivalLng = data.lng
  //         let popup = `<div class="leaflet-popup-content"><h3 class="leaflet-header">Flights from ${code.toUpperCase()} to ${data.code}</h3></div>`
  //         flights[data.code].forEach((flight) => {
  //           popup += `<p id="flight-number">${flight.flight.airline_name} ${flight.flight.number}</p>`
  //           if (flight.flight.aircraft_code !== undefined) {
  //             popup += `<p id="aircraft">${flight.flight.aircraft_code} Aircraft</p>`
  //           }
  //           if (flight.departure_time !== undefined) {
  //             let departing = flight.departure_time.substring(0, 16).replace(/T/i, ' at ')
  //             popup += `<p id="flight-times">Departing ${departing}</p>`
  //           } else {
  //             popup += `<p id="flight-times">Private Flight</p>`
  //           }
  //           if (flight.departure_time !== undefined) {
  //             let arriving = flight.arrival_time.substring(0, 16).replace(/T/i, ' at ')
  //             popup += `<p id="flight-times">Arriving ${arriving}</p>`
  //           }
  //           if (flight.status === 'cancelled') {
  //             popup += `<p id="flight-status-cancelled"> ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
  //           }
  //           if (flight.status === 'flight') {
  //             popup += `<p id="flight-status"> In ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
  //           }
  //           if (flight.status !== 'flight' && flight.status !== 'cancelled') {
  //             popup += `<p id="flight-status"> ${flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p><hr>`
  //           }
  //
  //         })
  //         let arrivalMarker = L.marker([arrivalLat, arrivalLng], {icon: arrivalIcon}).addTo(newMap)
  //         arrivalMarker.bindPopup(popup)
  //
  //         let fuckPolyline = L.polyline([
  //           [latitude, longitude],
  //           [arrivalLat, arrivalLng]],
  //           {
  //             color: 'teal',
  //             weight: 2,
  //             opacity: 0.7,
  //           })
  //         fuckPolyline.addTo(this.state.map).snakeIn()
  //       })
  //     })
  //
  // })





  render() {
    return (
      <div id="map" style={styles.map}></div>

    )
  }

}

const styles = {
  map: {
    height: '80vh',
    width: '100%',
  }
}
