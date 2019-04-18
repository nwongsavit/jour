import React, { Component } from 'react';
import './User.css';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

//  api key from .env file.
const apiKey = process.env.REACT_APP_API_KEY;

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      results: false,
      message: '',
      account_info: {},
      email: '',
      password: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ email: e.target.email.value });
    this.setState({ password: e.target.password.value });
    const { email } = this.state;
    const { password } = this.state;
    //  make the get request and set the message/result
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          //  THIS IS WHERE THE REQUIRED PARAMS FOR A CALL GO:
          //  for auth, that includes key, request, email, and password
          key: apiKey,
          request: 'authUser',
          email,
          password,
        },
      })
      .then(result =>
        this.setState(
          {
            results: result.data.result,
            message: result.data.message,
            account_info: result.data.account_info,
            //  this is an array of missing params, not needed here because the form has required set.
            //  needed: result.data.needed,
          },
          () => {
            console.log('this.state.account_ifno :', this.state.account_ifno);
          }
        )
      );
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { results } = this.state;
    const { message } = this.state;
    if (!results) {
      return (
        <div className="User">
          <Form className="form" onSubmit={this.handleSubmit}>
            <h3>Welcome back!</h3>
            <span
              id="errors"
              style={{ float: 'left', fontSize: 'x-small', color: 'red' }}
            >
              {message}
            </span>
            <Form.Control
              id="email"
              type="email"
              placeholder="Username"
              onChange={this.handleEmailChange}
              required
            />
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
              required
            />
            <Button type="submit" block>
              Submit
            </Button>
            <div id="register" className="smallText">
              Not registered? <a href="/register">Create an account</a>
            </div>
            <div id="forgot-password" className="smallText">
              Forgot password? <a href="/forgot-password">Click here</a>
            </div>
          </Form>
        </div>
      );
    }
    return (
      <div className="login-success">
        <span>You are now logged in!</span>
      </div>
    );
  }
}

export default Login;
