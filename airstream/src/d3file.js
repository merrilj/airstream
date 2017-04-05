//
//
// var map = ReactFauxDOM.createElement('div')
//
//
//
// return map.toReact()

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
//
// mapboxgl.accessToken = 'pk.eyJ1IjoibWVycmlsaiIsImEiOiJjajE0OXgydWUwMDQ4MzJwOWh0dXdnZzFwIn0.MYzauXs8grl-IMKjik3JUg';
// var map = new mapboxgl.Map({
// container: 'YOUR_CONTAINER_ELEMENT_ID',
// style: 'mapbox://styles/mapbox/light-v9'
// });

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WorldMap from 'react-world-map'

export default class Map extends Component {
  render() {
    return (
      <WorldMap />
    )
  }
}

window.addEventListener('WorldMapClicked', function(e) {console.log('map was clicked, current selection is: ', e.detail.clickedState)});
