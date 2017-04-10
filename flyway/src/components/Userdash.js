import React, { Component } from 'react'
import { Header, Image, Button, Modal, Input, Card, Icon } from 'semantic-ui-react'
import Airports from './Airports'
import Flights from './Flights'
import Nearby from './Nearby'

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
    openFlights: false
  }

  showAirports = (dimmer) => () => this.setState({ dimmer, openAirports: true })
  closeAirports = () => this.setState({ openAirports: false })

  showNearby = (dimmer) => () => this.setState({ dimmer, openNearby: true })
  closeNearby = () => this.setState({ openNearby: false })

  showFlights = (dimmer) => () => this.setState({ dimmer, openFlights: true })
  closeFlights = () => this.setState({ openFlights: false })



  render() {
    const { openAirports, openNearby, openFlights, dimmer } = this.state
    const distance = this.state.distance

    return (
      <div>

        <div style={styles.mainPage}>
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
        </Card.Group>
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
          <Modal.Header style={styles.modalHeader}>Search All Airports</Modal.Header>
          <Modal.Content image>
            <Nearby />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.closeNearby} />
          </Modal.Actions>
        </Modal>

        <Modal dimmer={dimmer} open={openFlights} onClose={this.closeFlights}>
          <Modal.Header style={styles.modalHeader}>Search All Airports</Modal.Header>
          <Modal.Content image>
            <Flights />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.closeFlights} />
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
    justifyContent: 'center'
  },
  card: {
    borderRadius: '8px'
  },
}
