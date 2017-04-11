import React, { Component } from 'react'
import { Header, Image, Button, Modal, Input, Card, Icon } from 'semantic-ui-react'
import { BounceDown } from 'animate-components'

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

  showFavorites = (dimmer, size) => () => this.setState({ dimmer, size, openFavorites: true })
  closeFavorites = () => this.setState({ openFavorites: false })

  render() {
    const { openAirports, openNearby, openFlights, openFavorites, dimmer, size } = this.state
    const distance = this.state.distance

    return (
      <div style={styles.outerDiv}>

        <div style={styles.mainPage}>
        <BounceDown>
          <Card.Group itemsPerRow={2}>
            <Card style={styles.card} onClick={this.showAirports('blurring')}>
              <Card.Content style={styles.cardHeader} header='Find Airports' />
              <Card.Content style={styles.cardP} description="Search airports around the world and see their flight network." />
              <Card.Content extra>
                <Icon name='world' />
                Airports
              </Card.Content>
            </Card>

            <Card style={styles.card} onClick={this.showNearby('blurring')}>
              <Card.Content style={styles.cardHeader} header='Nearby Airports' />
              <Card.Content style={styles.cardP} description="Discover airports near you and see the network between them." />
              <Card.Content extra>
                <Icon name='compass' />
                Nearby
              </Card.Content>
            </Card>

            <Card style={styles.card} onClick={this.showFlights('blurring')}>
              <Card.Content style={styles.cardHeader} header='Active Flights' />
              <Card.Content style={styles.cardP} description="Track hundreds of current active flights around the world." />
              <Card.Content extra>
                <Icon name='plane' />
                Real-Time
              </Card.Content>
            </Card>

            <Card style={styles.card} onClick={this.showFavorites('blurring', 'small')}>
              <Card.Content style={styles.cardHeader} header='Favorite Places' />
              <Card.Content style={styles.cardP} description="My saved favorite destinations and their flight operations." />
              <Card.Content extra>
                <Icon name='heart' />
                Favorites
              </Card.Content>
            </Card>
          </Card.Group>
          </BounceDown>
        </div>

        <Modal dimmer={dimmer} open={openAirports} onClose={this.closeAirports}>
          <Modal.Header style={styles.modalHeader}>Search for Any Airport</Modal.Header>
          <Modal.Content image>
            <Airports />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='remove' labelPosition='right' content="Close" onClick={this.closeAirports} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={openNearby} onClose={this.closeNearby}>
          <Modal.Header style={styles.modalHeader}>All Nearby Airports</Modal.Header>
          <Modal.Content image>
            <Nearby />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='remove' labelPosition='right' content="Close" onClick={this.closeNearby} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={openFlights} onClose={this.closeFlights}>
          <Modal.Header style={styles.modalHeader}>Real-Time Flights</Modal.Header>
          <Modal.Content image>
            <Flights />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='remove' labelPosition='right' content="Close" onClick={this.closeFlights} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} size={size} open={openFavorites} onClose={this.closeFavorites}>
          <Modal.Header style={styles.modalHeader}>Favorite Destinations</Modal.Header>
          <Modal.Content image>
            <Favorites />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='remove' labelPosition='right' content="Close" onClick={this.closeFavorites} />
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
    marginTop: '0',
    marginBottom: '0',
    fontFamily: 'Work Sans, sans-serif',
  },
  cardP: {
    fontFamily: 'Work Sans, sans-serif',
    fontSize: '1.5em',
    textAlign: 'center'
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
    alignItems: 'center'

  },
  outerDiv: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto'
  },
  card: {
    borderRadius: '8px'
  },
}
