import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import SearchInput, { createFilter } from 'react-search-input'
import L from 'leaflet'
import IC from 'iatacodes'
import swal from 'sweetalert'

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
      arrivalLng: [],
      popup: null,
      popupOptions: null
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
          <br><button id="popup-btn"><a href=${website} target="_blank">Visit Our Website</a></button>
          <button id="popup-btn">See Flights</button>
        `)
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

              let popup = `<h4>${data.code} Flights</h4>`
              flights[data.code].forEach((flight) => {
                popup += `<br>${flight.flight.airline_name} ${flight.flight.number}`
                popup += `<br>From ${flight.departure_code}`
                popup += `<br>To ${flight.arrival_code}`
                popup += `<br>Departing ${flight.departure_time}`
                popup += `<br>Arriving ${flight.arrival_time}`
                popup += `<br>Status - ${flight.status}`
              })

              let marker = L.marker([arrivalLat, arrivalLng], {icon: this.state.smallIcon}).addTo(this.state.map)
              marker.bindPopup(popup)

            })
          })

      })
    }

    if (new_code.length < 3) {
      this.state.map.flyTo([37.8, -96.9], 3)
    }

  }

  newMap() {
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
     iconUrl: 'https://cdn4.iconfinder.com/data/icons/vehicle-and-logistics/30/airplane-arrive-512.png',
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
