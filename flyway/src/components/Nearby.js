import React, { Component } from 'react'
import L from 'leaflet'
import IC from 'iatacodes'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

export default class Nearby extends Component {
  constructor(props) {
    super(props)

    this.nearby = this.nearby.bind(this)

    this.state = {
      map: null,
      icon: null,
      smallIcon: null,
      lat: [],
      lng: [],
      airports: []
    }
  }

  componentDidMount() {
    this.createMap()
  }

  nearby() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var lng = position.coords.longitude
      console.log(lat, lng)
    ic.api('nearby', {lat: lat, lng: lng, distance: 100}, function(error, response) {
      // console.log(response)
      response.forEach((data) => {
        if (data.type === 'airport' && data.icao.length > 1) {
          console.log(data)

          let latitude = data.lat
          let longitude = data.lng
          console.log(latitude, longitude)
          // this.setState({lat: latitudes})
          // this.setState({lng: longitudes})
          let name = data.name
          if (!name.includes('Airport')) {
            name = (name + ' Airport').toUpperCase()
          }
          // console.log(data)

          let marker = L.marker([latitude, longitude]).addTo(this.state.map)
          // this.state.map.flyTo([lat, lng], 4)

          marker.bindPopup(`
            <b>${name}</b>
            <button id="popup-btn">See Flights</button>
          `)

        }
      })
      })
    })
  }


    createMap() {
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
