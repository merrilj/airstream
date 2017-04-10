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

  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, dimmer } = this.state
    const distance = this.state.distance

    return (
      <div>

        <div style={styles.mainPage}>
          <Card.Group itemsPerRow={2}>

            <Card onClick={this.show('blurring')}>
              <Card.Content style={styles.cardHeader} header='Search for Airports' />
              <Card.Content style={styles.cardP} description="Search for airports around the world and see their direct flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>

            <Card onClick={this.show('blurring')}>
              <Card.Content style={styles.cardHeader} header='Nearby Airports' />
              <Card.Content style={styles.cardP} description="Find airports near you and their nonstop flights." />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>

        <Card onClick={Airports}>
          <Card.Content style={styles.cardHeader} header='Active Flights' />
          <Card.Content style={styles.cardP} description="See thousands of current active flights." />
          <Card.Content extra>
            <Icon name='user' />
            4 Friends
          </Card.Content>
        </Card>





        <Card onClick={this.show('blurring')}>
          <Card.Content style={styles.cardHeader} header='Favorite Airports' />
          <Card.Content style={styles.cardP} description="View your saved airports here." />
          <Card.Content extra>
            <Icon name='user' />
            4 Friends
          </Card.Content>
        </Card>
      </Card.Group>
        </div>

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
  mainPage: {
    paddingTop: '6em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}
