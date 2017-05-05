import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Enter email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Enter password' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

const styles = {}
