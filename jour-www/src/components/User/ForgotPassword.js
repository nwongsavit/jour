import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './User.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//  api key from .env file.
const apiKey = process.env.REACT_APP_API_KEY;

class ForgotPassword extends Component {
  constructor() {
    super();

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);

    this.state = {
      email: '',
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSaveClick(e) {
    // tba
  }

  handleCancelClick = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="ForgotPassword">
        <Form className="form">
          <h3>Reset Password</h3>
          {/* {!results ? <div className="small-text error">{message}</div> : ''} */}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Your email address"
            onChange={this.handleEmailChange}
            autoComplete="new-password"
            required
          />
          <div className="confirmation-buttons">
            <Button type="submit" onClick={this.handleSaveClick}>
              Save
            </Button>
            <Button variant="light" onClick={this.handleCancelClick}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword;
