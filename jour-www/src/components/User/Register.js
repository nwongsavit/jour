import React, { Component } from 'react';
import './User.css';

import { Form, Button } from 'react-bootstrap';

class Register extends Component {
  render() {
    return (
      <div className="User">
        <Form className="form">
          <h3>Sign Up</h3>
          <Form.Control type="firstName" placeholder="First Name" required />
          <Form.Control type="lastName" placeholder="Last Name" required />
          <Form.Control type="email" placeholder="Email" required />
          <Form.Control type="password" placeholder="Password" required />
          <Button type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
