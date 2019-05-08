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
      account_info: {},
      name: '',
      password: '',
      email: '',
    };
  }

  componentWillMount() {
    document.title = 'Jour - Settings';
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  handleCancelClick = () => {
    this.props.history.push('/calendar');
  };

  handleSaveClick(e) {
    e.preventDefault();

    const { name, password, email } = this.state;
    const { uid, authKey } = this.props;

    let params = {
      key: apiKey,
      request: 'editUser',
      uid,
      authKey,
      email,
      name,
    };

    if (password !== '') {
      params = { ...params, ...password };
    }

    axios
      .get('https://jour.life/api/api.php', {
        params,
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
      }))
      .catch((error) => {
        console.log('error :', error);
      });

    axios
      .get('https://jour.life/api/api.php', {
        params: {
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
              account_info: this.state.account_info,
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

Settings.propTypes = {
  uid: PropTypes.number,
  authKey: PropTypes.string,
};

Settings.defaultProps = {
  uid: null,
  authKey: '',
};

const mapStateToProps = state => ({
  account_info: state.account_info,
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Settings));
