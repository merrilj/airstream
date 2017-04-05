import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import SearchInput, { createFilter } from 'react-search-input'
import L from 'leaflet'
import IC from 'iatacodes'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

var lat
var lng
var name
var phone
var website

export default class Airports extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      airport: [],
      code: '',
      map: null,
      icon: null
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
        lat = data.lat
        lng = data.lng
        name = data.name + ' Airport'
        phone = data.phone
        website = data.website.toString()
        var marker = L.marker([lat, lng], {icon: this.state.icon}).addTo(this.state.map)
        this.state.map.setView([lat, lng], 9)
        marker.bindPopup(`
          <b>${name}</b>
          <br>${phone}
          <br><a href=${website} target="_blank">Visit Our Website</a>
        `)
      })
    }
    if (new_code.length < 3) {
      this.state.map.setView([37.8, -96.9], 3)

    }
  }

  getAirports() {
    var newMap = new L.Map("map", {center: [37.8, -96.9], zoom: 3})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(newMap);

   this.setState({map: newMap})

   var airportIcon = L.icon({
     iconUrl: 'https://cdn2.iconfinder.com/data/icons/airport-set-2/512/33-512.png',
     iconSize: [30, 35],
   })

   this.setState({icon: airportIcon})

  }

  render() {
    const code = this.state.code

    return (
      <div>
        <Input size='large' value={code} onChange={this.handleChange} type="text" icon='search' placeholder='Search for airport...' />
        <div id="map"></div>
      </div>
    )
  }
}
