import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Settings.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//  api key from .env file.
const apiKey = process.env.REACT_APP_API_KEY;

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);

    this.state = {
      results: '',
      message: '',
      account_info: this.props.account_info,
      uid: this.props.account_info.uid,
      name: '',
      password: '',
      email: '',
    };
  }

  handleCancelClick = () => {
    this.props.history.push('/calendar');
  }

  handleSaveClick(e) {
    e.preventDefault();
    const { name, password, email, account_info, uid } = this.state;

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'editUser',
          email,
          name,
          password,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          if (result.data.result) {
            this.props.dispatch({
              type: 'EDIT_USER',
            });
          }
        },
      ))
      .catch((error) => {
        console.log('error :', error);
      });

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getUser',
          uid,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          account_info: result.data.account_info,
        },
        () => {
          if (result.data.result) {
            this.props.dispatch({
              type: 'GET_USER',
            });
          }
        },
      ))
      .catch((error) => {
        console.log('error :', error);
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { name, email } = this.props.account_info;
    const { message, results } = this.state;

    return (
      <div className="Settings">
        <Form className="form">
          <h3>Settings</h3>
          {!results ? <div className="small-text error">{message}</div> : ''}
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="firstName"
            id="name"
            placeholder="Your name"
            onChange={this.handleNameChange}
            autoComplete="new-password"
            required
          />
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Your email address"
            onChange={this.handleEmailChange}
            autoComplete="new-password"
            required
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Your password"
            onChange={this.handlePasswordChange}
            autoComplete="new-password"
            required
          />
          <div className="confirmation-buttons">
            <Button type="submit" onClick={this.handleSaveClick}>
            Save Changes
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

Settings.propTypes = {
  account_info: PropTypes.object,
};

Settings.defaultProps = {
  account_info: {},
};

const mapStateToProps = state => ({
  account_info: state.account_info,
});

export default withRouter(connect(mapStateToProps)(Settings));
