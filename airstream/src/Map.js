import React from 'react'
import { render } from 'react-dom'
import L from 'leaflet'

export default class Mapbox extends React.Component {
  componentDidMount() {
    this.map()
  }

  map() {

    var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   var marker = L.marker([37.8, -96.9]).addTo(map)

   marker.bindPopup("<b>Wow! I am elated!</b><br>This is awesome!").openPopup()

   var popup = L.popup()
   function onMapClick(e) {
     popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map)
   }
   map.on('click', onMapClick)
}


 render() {
   return <div id="map">xx</div>
 }
}
