import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Full Name</label>
            <input placeholder='Enter full name' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Enter email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Choose a password' />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input placeholder='Confirm password' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

const styles = {

}
