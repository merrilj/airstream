import React, { Component } from 'react'
import L from 'leaflet'
import axios from 'axios'

export default class Flights extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plane: [],
      clickZoom: null,
    }
  }

  componentDidMount() {
    this.getFlights()
  }


  getFlights() {
    var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   function clickZoom(e) {
     map.flyTo(e.target.getLatLng(), 6)
   }

   this.setState({clickZoom: clickZoom})

   var planeIcon = L.icon({
     iconUrl: 'https://cdn2.iconfinder.com/data/icons/app-types-in-grey/512/airplane_512pxGREY.png',
     shadowUrl: '',

     iconSize: [20, 20],
     shadowSize: [10, 10],
    //  iconAnchor: [20, 20],
    //  shadowAnchor: [22, 94],
    //  popupAnchor: [-3, -76]
   })

    return axios.get('https://iatacodes.org/api/v6/flights?api_key=772513cb-42b7-4262-b735-00d2f52eb796')
      .then((data) => {
        this.setState({ plane: data.data.response })
        var flights = this.state.plane
        flights.forEach((data) => {
          var lat = data.geography.lat
          var lng = data.geography.lng
          var alt = data.geography.alt
          var speed = data.speed.horizontal
          var arrival = data.arrival_code
          var departure = data.departure_code
          var aircraft = data.flight.aircraft_code
          var flightNum = data.flight.name

          var marker = L.marker([lat, lng], {icon: planeIcon}).addTo(map)
           marker.bindPopup(`<div id="flight-popup">
            <p id="flight-num">Flight ${flightNum}</p>
            <p id="flight-aircraft">${aircraft}</p>
            <p id="flight-dep">From ${departure}</p>
            <p id="flight-arr">To ${arrival}</p></div>
            <p id="flight-alt">${alt} ft</p>
            <p id="flight-speed">${speed} mph</p>
          `).on('click', this.state.clickZoom)
        })
      })
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
