import React, { Component } from 'react'
import { Header, Segment, Button, Divider, Grid, Modal } from 'semantic-ui-react'
import { BounceDown, RollIn } from 'animate-components'

import SignIn from './SignIn'
import SignUp from './SignUp'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  state = { open: false }
  show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, size } = this.state
    return (
      <div>
        <div>
          <BounceDown>
            <h1 style={styles.bounceText}>Welcome! Easily visualize direct flights from and to any airport</h1>
          </BounceDown>
        </div>
        <div style={styles.balls}>
        <RollIn style={styles.roller}>
        <Segment onClick={this.show('small')} circular style={styles.signButtons}>
          <Header as='h1'>
            Sign Up
          </Header>
        </Segment>
        </RollIn>
        <RollIn style={styles.roller}>
        <Segment onClick={this.show('small')} circular style={styles.signButtons}>
          <Header as='h1'>
            Sign In
          </Header>
        </Segment>
        </RollIn>
        </div>
        <div style={styles.modal}>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>
            Sign Up for An Account
          </Modal.Header>
          <Modal.Content>
            <SignIn />
          </Modal.Content>
          <Modal.Actions>
            <Button negative icon='remove' labelPosition='right' content='Cancel' onClick={this.close}/>
          </Modal.Actions>
        </Modal>
        </div>
      </div>
    )
  }
}

const styles = {
  signIn: {
    width: '40%'
  },

  bounceText: {
    marginTop: '4em',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: '3em'
  },

  signButtons: {
    width: '150',
    height: '150',
    padding: '2em',
  },

  balls: {
    paddingTop: '3em',
    display: 'flex',
    justifyContent: 'center',
  },

  roller: {
    padding: '3em'
  },
  modal: {

  }

}
