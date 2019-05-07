import React, { Component } from 'react';
import './User.css';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
      isLoggedIn: false,
      email: '',
      password: '',
    };
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.history.push('/calendar');
    }
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
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          account_info: result.data.account_info,
          isLoggedIn: true,
          //  this is an array of missing params, not needed here because the form has required set.
          //  needed: result.data.needed,
        },
        () => {
          if (result.data.result) {
            this.props.dispatch({
              type: 'LOGIN',
              account_info: this.state.account_info,
              isLoggedIn: this.state.isLoggedIn,
            });
          }
        },
      ))
      .catch((error) => {
        console.log('error :', error);
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { message, results } = this.state;

    return (
      <div className="User">
        <Form className="form" onSubmit={this.handleSubmit}>
          <h3>Welcome back!</h3>
          {!results ? <div className="small-text error">{message}</div> : ''}
          <Form.Control
            id="email"
            type="email"
            placeholder="Email address"
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
              Sign in
          </Button>
          <div id="register" className="small-text">
              Not registered?
            {' '}
            <a href="/register">Create a new account</a>
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
}

const mapStateToProps = state => ({
  account_info: state.account_info,
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Login));

