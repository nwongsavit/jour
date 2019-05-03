import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      results: false,
      //  message sent with the result. these can be changed in api.php.
      message: '',
      //  first name
      first: '',
      //  password
      pass: '',
      //  email
      emailAddress: '',
    };
  }

  handleFirstChange(e) {
    this.setState({ first: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ emailAddress: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ pass: e.target.value });
  }
  
  render() {
    return (
      <div className="Settings">
      <Form className="form">

        <h3>Settings</h3>

        <Form.Control
          type="email"
          id="emailAddress"
          placeholder="New Email"
          onChange={this.handleEmailChange}
          required
        />
        <Button
          type="submit"
          block
        >
          Change Email
        </Button>

        <Form.Control
          type="password"
          id="pass"
          placeholder="Password"
          onChange={this.handlePasswordChange}
          required
        />
        <Button
          type="submit"
          block
        >
          Change Password
        </Button>

        <Form.Control
          type="firstName"
          id="first"
          placeholder="New First Name"
          onChange={this.handleFirstChange}
          required
        />
        <Button
          type="submit"
          block
        >
          Change First Name
        </Button>
      </Form>
    </div>
    );
  }
}

export default Settings;
