import React, { Component } from 'react'
import { Header, Image, Button, Modal, Input, Card, Icon } from 'semantic-ui-react'
import Airports from './Airports'
import Flights from './Flights'
import Nearby from './Nearby'

export default class Cards extends Component {
  constructor(props) {
    super(props)

    this.state = {}
}

  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, dimmer } = this.state

    return (
      <div>

            <Card style={styles.card} onClick={this.show('blurring')}>
              <Card.Content style={styles.cardHeader} header='Search for Airports' />
              <Card.Content style={styles.cardP} description="Search for airports around the world and see their direct flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header style={styles.modalHeader}>Search All Airports</Modal.Header>
          <Modal.Content image>
            <Airports />
          </Modal.Content>
          <Modal.Actions>
            <Button style={styles.closeButton} color='teal' icon='checkmark' labelPosition='right' content="Close" onClick={this.close} />
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
  card: {
    borderRadius: '8px'
  },
}
