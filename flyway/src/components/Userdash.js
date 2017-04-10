import React, { Component } from 'react'
import { Header, Image, Button, Modal, Input, Card, Icon } from 'semantic-ui-react'
import { BounceDown, RollIn, Swing, Hatch, Entrance, Pulse, Flash, LightOut, LightIn, Flip, FadeInLeftBig } from 'animate-components'

import Airports from './Airports'
import Flights from './Flights'
import Nearby from './Nearby'
import Favorites from './Favorites'

export default class UserDash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      distance: null,
  }
}

  state = {
    openAirports: false,
    openNearby: false,
    openFlights: false,
    openFavorites: false
  }

  showAirports = (dimmer) => () => this.setState({ dimmer, openAirports: true })
  closeAirports = () => this.setState({ openAirports: false })

  showNearby = (dimmer) => () => this.setState({ dimmer, openNearby: true })
  closeNearby = () => this.setState({ openNearby: false })

  showFlights = (dimmer) => () => this.setState({ dimmer, openFlights: true })
  closeFlights = () => this.setState({ openFlights: false })

  showFavorites = (dimmer) => () => this.setState({ dimmer, openFavorites: true })
  closeFavorites = () => this.setState({ openFavorites: false })

  render() {
    const { openAirports, openNearby, openFlights, openFavorites, dimmer } = this.state
    const distance = this.state.distance

    return (
      <div>

        <div style={styles.mainPage}>
        <BounceDown>
          <Card.Group itemsPerRow={2}>
            <Card style={styles.card} onClick={this.showAirports('blurring')}>
              <Card.Content style={styles.cardHeader} header='Search for Airports' />
              <Card.Content style={styles.cardP} description="Search for airports around the world and see their direct flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>

            <Card style={styles.card} onClick={this.showNearby('blurring')}>
              <Card.Content style={styles.cardHeader} header='Nearby Airports' />
              <Card.Content style={styles.cardP} description="Find airports near you and their nonstop flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>

            <Card style={styles.card} onClick={this.showFlights('blurring')}>
              <Card.Content style={styles.cardHeader} header='Active Flights' />
              <Card.Content style={styles.cardP} description="See thousands of current active flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>

            <Card style={styles.card} onClick={this.showFavorites('blurring')}>
              <Card.Content style={styles.cardHeader} header='See Favorite Airports' />
              <Card.Content style={styles.cardP} description="Search for airports around the world and see their direct flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>
          </Card.Group>
          </BounceDown>
        </div>

        <Modal dimmer={dimmer} open={openAirports} onClose={this.closeAirports}>
          <Modal.Header style={styles.modalHeader}>Search All Airports</Modal.Header>
          <Modal.Content image>
            <Airports />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.closeAirports} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={openNearby} onClose={this.closeNearby}>
          <Modal.Header style={styles.modalHeader}>See Nearby Airports</Modal.Header>
          <Modal.Content image>
            <Nearby />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.closeNearby} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={openFlights} onClose={this.closeFlights}>
          <Modal.Header style={styles.modalHeader}>See Real-Time Flights</Modal.Header>
          <Modal.Content image>
            <Flights />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.closeFlights} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={openFavorites} onClose={this.closeFavorites}>
          <Modal.Header style={styles.modalHeader}>My Favorite Airports</Modal.Header>
          <Modal.Content image>

          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.closeFavorites} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const styles = {
  map: {
    height: '60vh',
    width: '100%',
  },
  cardHeader: {
    paddingTop: '0',
    paddingBottom: '0',
    fontFamily: 'Work Sans, sans-serif',
    color: 'gray'
  },
  cardP: {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.5em',

  },
  modalHeader: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.9em'
  },
  closeButton: {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.3em',
  },
  mainPage: {
    paddingTop: '6em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '10em',
    paddingRight: '10em'
  },
  card: {
    borderRadius: '8px'
  },
}
