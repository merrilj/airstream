import React, { Component } from 'react'
import { Popup, Header, Image, Button, Modal } from 'semantic-ui-react'
import IC from 'iatacodes'
import L from 'leaflet'

const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')

export default class UserDash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      map: null
    }
  }
  state = { open: false }

  show = (size, dimmer) => () => this.setState({ size, dimmer, open: true })
  close = () => this.setState({ open: false })


  componentDidMount() {
    this.createMap()
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

    // this.setState({icon: airportIcon})

    var arrivalIcon = L.icon({
      iconUrl: 'https://cdn3.iconfinder.com/data/icons/basicolor-transportation/24/264_airport_flight_arrival-512.png',
      iconSize: [15, 15],
    })

    // this.setState({smallIcon: arrivalIcon})
    // this.nearby()
  }

  // nearby() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     var lat = position.coords.latitude
  //     var lng = position.coords.longitude
  //     console.log(lat, lng)
  //   ic.api('nearby', {lat: lat, lng: lng, distance: 100}, function(error, response) {
  //     // console.log(response)
  //     response.forEach((data) => {
  //       if (data.type === 'airport' && data.icao.length > 1) {
  //         console.log(data)
  //
  //         let latitude = data.lat
  //         let longitude = data.lng
  //         console.log(latitude, longitude)
  //         // this.setState({lat: latitudes})
  //         // this.setState({lng: longitudes})
  //         let name = data.name
  //         if (!name.includes('Airport')) {
  //           name = (name + ' Airport').toUpperCase()
  //         }
  //         // console.log(data)
  //
  //         let marker = L.marker([latitude, longitude]).addTo(this.state.map)
  //         // this.state.map.flyTo([lat, lng], 4)
  //
  //         marker.bindPopup(`
  //           <b>${name}</b>
  //           <button id="popup-btn">See Flights</button>
  //         `)
  //
  //       }
  //     })
  //     })
  //   })
  // }


  render() {
    const { open, size, dimmer } = this.state
    return (
      <div>
        <Popup trigger={<Button onClick={this.show('large', 'blurring')}>Nearby Airports</Button>}>
          <Popup.Header>See Nearby Airports</Popup.Header>
          <Popup.Content>
            See airports and their nonstop flights within a specified distance from your current location.
          </Popup.Content>
        </Popup>

        <Popup trigger={<Button onClick={this.createMap, this.show('large', 'blurring')}>All Airports</Button>}>
          <Popup.Header>Search Your Airport</Popup.Header>
          <Popup.Content>
            Search for any airport around the world and see their nonstop flights.
          </Popup.Content>
        </Popup>

        <Popup trigger={<Button onClick={this.createMap, this.show('large', 'blurring')}>In-Air Flights</Button>}>
          <Popup.Header>All Current Flights</Popup.Header>
          <Popup.Content>
            See a visual representation of current in-air flights in real time
          </Popup.Content>
        </Popup>


        <Modal size={size} dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <div id="map" style={styles.map}></div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const styles = {
  map: {
    height: '70vh',
    width: '100%',
    borderRadius: '10px'
  }
}
