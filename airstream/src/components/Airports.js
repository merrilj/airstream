import React, { Component } from 'react'
import L from 'leaflet'
import axios from 'axios'

export default class Airports extends Component {
  constructor(props) {
    super(props)

    this.state = {airports: []}
  }

  componentDidMount() {
    this.getAirports()
  }


  getAirports() {
    var map = new L.Map("map", {center: [37.8, -96.9], zoom: 3})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   var airportIcon = L.icon({
     iconUrl: 'https://cdn2.iconfinder.com/data/icons/airport-set-2/512/33-512.png',
     shadowUrl: '',

     iconSize: [20, 25],
    //  shadowSize: [10, 10],
    //  iconAnchor: [20, 20],
    //  shadowAnchor: [22, 94],
    //  popupAnchor: [-3, -76]
   })

   var popup = L.popup()
   function onMapClick(e) {
     popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map)
   }
   map.on('click', onMapClick)

    return axios.get('https://iatacodes.org/api/v6/airports?api_key=772513cb-42b7-4262-b735-00d2f52eb796')
      .then((data) => {
        this.setState({ airports: data.data.response })
        var allTransit = this.state.airports
        console.log(allTransit)
        var allAirports = allTransit.filter((data) => {
          return data.type === 'airport'
        })
        allAirports.map((data) => {
          // console.log(data)
          if (data.lat !== null || data.lng !== null) {
            var lat = data.lat
            var lng = data.lng
          }
          if (data.website !== "" || data.website !== null || data.website !== undefined) {
            var website = data.website
          }
          if (data.phone !== "" || data.phone !== null || data.phone !== undefined) {
            var phone = data.phone
          }
          var code = data.code
          var name = data.name


          var marker = L.marker([lat, lng], {icon: airportIcon}).addTo(map)
           marker.bindPopup(`
            <b>${name}</b>
            <br>${code}
            <br>${website}
            <br>${phone}
          `)
        })

      })
  }

  render() {
   return (
     <div id="map"></div>
   )
 }
}
