import React, { Component } from 'react';
import './User.css';

import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <div className="User">
        <Form className="form">
          <h3>Welcome back!</h3>
          <Form.Control type="username" placeholder="Username" required />
          <Form.Control type="password" placeholder="Password" required />
          <Button type="submit" block>
            Submit
          </Button>
          {/* <div id="forgotPasswordText" className="smallText">Forgot password?</div> */}
          <div id="register" className="smallText">
            Not registered?
            {' '}
            <a href="/register">Create an account</a>
          </div>
          <div id="forgot-password" className="smallText">
            Forgot password?
            {' '}
            <a href="/forgot-password">Click here</a>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
