import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import IC from 'iatacodes'
import L from 'leaflet'


const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')
export default class UserDash extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    this.nearby()
    this.newMap()
  }

  nearby() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude
      var lng = position.coords.longitude
      console.log(lat, lng)
    ic.api('nearby', {lat: lat, lng: lng, distance: 100}, function(error, response) {
        if (response[0].type === 'airport') {
          console.log(response);

        }
      })
    })
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
    return (
      <div style={styles.main}>
        <div style={styles.divs}><Button size='big' primary>See All in-air flights</Button></div>
        <div style={styles.div}><Button size='big' primary>View airports and non-stop flights</Button></div>
        <div style={styles.div}><Button size='big' primary>View Nearby Airports and Nonstop Flights</Button></div>
      </div>
    )
  }
}

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
  },

  div: {
    width: '30rem',
  }
}
