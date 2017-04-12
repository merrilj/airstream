import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import L from 'leaflet'
import IC from '../IC'
import $ from 'jquery'
import axios from 'axios'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

export default class Nearby extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      distance: '',
      map: null,
      airportIcon: null,
      arrivalIcon: null,
      meIcon: null,
      meMarker: null,
      nearbyMarkers: [],
      alreadyAddedError: null,
    }
  }

  componentDidMount() {
    this.newMap()
  }

  handleChange(e) {
    let dist = e.target.value
    this.setState({distance: dist})
    if (dist.length > 1) {
      let distToNum = parseInt(dist)
      let miToKm = distToNum * 1.60934
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var lng = position.coords.longitude

    ic.api('nearby', {lat: lat, lng: lng, distance: miToKm}, (error, response) => {
      response.forEach((data) => {
        if (data.type === 'airport' && data.icao.length > 1) {
          let latitude = data.lat
          let longitude = data.lng
          let code = data.code
          let name = data.name
          let myDistance = Math.ceil(data.distance * 0.000621371)

          if (!name.includes('Airport')) {
            name = (name + ' Airport').toUpperCase()
          }

          let meMarker = L.marker([lat, lng], {icon: this.state.meIcon}).addTo(this.state.map)
          this.state.map.flyTo([lat, lng], 8)
          this.setState({meMarker: meMarker})

          let nearbyMarker = L.marker([latitude, longitude], {icon: this.state.airportIcon}).addTo(this.state.map)

          let nearbyMarkers = this.state.nearbyMarkers.concat(nearbyMarker)
          this.setState({nearbyMarkers: nearbyMarkers})

          let airportPopup = $(`<div>
            <p id="airport-title">${name}</p>
            <p id="airport-distance">${myDistance} miles away</p>
            <p id="airport-code">Search by ${code} airport code</p></div>
          `)
          let button = $(`<button class="favorites-btn">Add to Favorites</button>`).click(() => {
            axios.post('http://localhost:4000/favorites', {
              name: name,
              code: code.toUpperCase()
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
          nearbyMarker.bindPopup(airportPopup[0])
        }
      })
      })
    })
  } else if (dist.length < 1) {
    this.state.map.flyTo([37.8, -96.9], 4)
    for (var i = 0; i < this.state.nearbyMarkers.length; i++) {
      this.state.map.removeLayer(this.state.nearbyMarkers[i])
    }
  }


  }

  newMap() {
    var newMap = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

    this.setState({map: newMap})

    var airportIcon = L.icon({
      iconUrl: 'https://cdn3.iconfinder.com/data/icons/map/500/airport-512.png',
      iconSize: [30, 35],
    })

    this.setState({airportIcon: airportIcon})

    var arrivalIcon = L.icon({
      iconUrl: 'https://cdn3.iconfinder.com/data/icons/basicolor-transportation/24/264_airport_flight_arrival-512.png',
      iconSize: [15, 15],
    })

    this.setState({arrivalIcon: arrivalIcon})

    var meIcon = L.icon({
      iconUrl: 'http://www.clipartkid.com/images/250/my-favorite-cliparts-ScFfFE-clipart.png',
      iconSize: [30, 35],
    })

    this.setState({meIcon: meIcon})

  }


  render() {
    const maxDist = this.state.distance
    return (
      <div style={styles.mainDiv}>
        <div style={styles.distanceInput}>
          <Input icon='location arrow' value={maxDist} onChange={this.handleChange} placeholder='Max distance...' />
          <span style={styles.distanceSpan}>miles</span>
        </div>
        <div id="map" style={styles.map}></div>
      </div>
    )
  }

}

const styles = {
  map: {
    height: '80vh',
    width: '100%',
  },
  mainDiv: {
    width: '100%'
  },
  distanceInput: {
    paddingBottom: '0.7em'
  },
  distanceSpan: {
    paddingLeft: '0.4em',
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.3em'
  },
  allFlights: {
    float: 'right'
  }
}
