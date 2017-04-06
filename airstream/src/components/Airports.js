import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import SearchInput, { createFilter } from 'react-search-input'
import L from 'leaflet'
import IC from 'iatacodes'

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
      arrivalLat: [],
      arrivalLng: []
    }
  }

  componentDidMount() {
    this.getAirports()
  }

  handleChange(e) {
    let new_code = e.target.value
    this.setState({code: new_code})
    if (new_code.length === 3) {
      ic.api('airports', {code: new_code}, (error, response) => {
        let data = response[0]
        let lat = data.lat
        let lng = data.lng
        let phone
        if (data.phone.length > 0) {
          phone = data.phone
        }
        let website
        if (data.website.length > 0) {
          website = data.website
        }
        let name = data.name
        if (name.includes('Airport') === false) {
          name = (name + ' Airport').toUpperCase()
        }

        let marker = L.marker([lat, lng], {icon: this.state.icon}).addTo(this.state.map)
        this.state.map.flyTo([lat, lng], 12)

        marker.bindPopup(`
          <b>${name}</b>
          <br>Phone Number: ${phone}
          <br><a href=${website} target="_blank">Visit Our Website</a>
        `)
      })

      ic.api('timetable', {code: new_code, type: 'departure'}, (error, response) => {
        let departureCode = []
        let arrivalCode = []
        let arrivalLat
        let arrivalLng
        let airlineName
        let departureTime
        let arrivalTime
        let arrivalCity
        let departureCity
        let aircraftCode
        let flightNumber
        let status
        
        response.map( (data) => {
          arrivalCode.push(data.arrival_code)
          airlineName = data.flight.airline_name
          departureTime = data.departure_time
          arrivalTime = data.arrival_time
          arrivalCity = data.arrival_code
          departureCity = data.departure_code
          aircraftCode = data.flight.aircraft_code
          flightNumber = data.flight.number
          status = data.status
        })
          ic.api('airports', {code: arrivalCode}, (error, response) => {
            response.map((data) => {
              arrivalLat = data.lat
              arrivalLng = data.lng
              console.log(arrivalLat)

              let marker = L.marker([arrivalLat, arrivalLng], {icon: this.state.smallIcon}).addTo(this.state.map)
              marker.bindPopup(`
                <b>${airlineName}</b>
                <br>Flight ${flightNumber}
                <br>From ${departureCity}
                <br>To ${arrivalCity}
                <br>Departing ${departureTime}
                <br>Arriving ${arrivalTime}
                <br>Status - ${status}
              `)
            })
          })

      })


    }

    if (new_code.length < 3) {
      this.state.map.flyTo([37.8, -96.9], 3)
    }

  }

  getAirports() {
    var newMap = new L.Map("map", {center: [37.8, -96.9], zoom: 3})
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
     iconUrl: 'https://cdn3.iconfinder.com/data/icons/map/500/airport-512.png',
     iconSize: [10, 10],
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
