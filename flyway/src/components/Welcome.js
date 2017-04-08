import React, { Component } from 'react'
import Typist from 'react-typist'
import { Segment, Button, Divider, Grid } from 'semantic-ui-react'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <div>
        
        </div>
        <Segment padded style={styles.segment}>
          <Button primary fluid>Login</Button>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid>Sign Up Now</Button>
        </Segment>
      </div>
    )
  }
}

const styles = {
  segment: {
    marginTop: '3rem',

  }
}
