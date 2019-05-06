import React, { Component } from 'react';
import './User.css';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

//  api key from .env file.
const apiKey = process.env.REACT_APP_API_KEY;

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      results: false,
      //  message sent with the result. these can be changed in api.php.
      message: '',
      //  needed: [], //this is npt needed for this page because the form has required set to true
      //  first name
      first: '',
      //  password
      pass: '',
      //  email
      emailAddress: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ first: e.target.first.value });
    this.setState({ pass: e.target.pass.value });
    this.setState({ emailAddress: e.target.emailAddress.value });
    const { first } = this.state;
    const { pass } = this.state;
    const { emailAddress } = this.state;
    //  make the get request and set the message/result
    axios.get('https://jour.life/api/api.php', {
      params: {
        //  THIS IS WHERE THE REQUIRED PARAMS FOR A CALL GO:
        //  for register, that includes key, request, email, first name, and password
        key: apiKey,
        request: 'registerUser',
        name: first,
        password: pass,
        email: emailAddress,
      },
    })
      .then(result => this.setState({
        //  see what results you will get here by looking at the JSON examples
        //  in thr api doc for the request you are making
        results: result.data.result,
        message: result.data.message,
        //  this is an array of missing params, not needed here because the form has required set.
        //  needed: result.data.needed,
      }));
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
    const { results } = this.state;
    const { message } = this.state;
    if (!results) {
      return (
        <div className="User">
          <Form className="form" onSubmit={this.handleSubmit}>
            <h3>Welcome!</h3>
            <span
              id="errors"
              style={{ float: 'left', fontSize: 'x-small', color: 'red' }}
            >
              {message}
            </span>
            <Form.Control
              type="firstName"
              id="first"
              placeholder="First name"
              onChange={this.handleFirstChange}
              required
            />
            <Form.Control
              type="email"
              id="emailAddress"
              placeholder="Email address"
              onChange={this.handleEmailChange}
              required
            />
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
              Create new account
            </Button>
            <div id="login" className="small-text">
              Already have an account?
              {' '}
              <a href="/login">Sign in</a>
            </div>
            <div id="forgot-password" className="small-text">
              Forgot password?
              {' '}
              <a href="/forgot-password">Click here</a>
            </div>
          </Form>
        </div>
      );
    }
    return (
      <div className="success">
        <span>Success. Click the link in the confirmation email to finish registration.</span>
      </div>
    );
  }
}

export default Register;
