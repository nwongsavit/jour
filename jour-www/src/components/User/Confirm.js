import React, { Component } from 'react';
import './User.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Home from '../Home/Home';


//  api key from .env file.
const apiKey = process.env.REACT_APP_API_KEY;

class Confirm extends Component {
  constructor(props) {
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
    //  parse the parameters from the url
    /* eslint-disable global-require */
    /* eslint-disable */
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    /* eslint-enable */
    /* eslint-enable global-require */

    this.state = {
      results: false,
      //  message sent with the result. these can be changed in api.php.
      message: '',
      emailKey: parsed.emailKey,
      email: parsed.email,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { emailKey } = this.state;

    axios.get('https://jour.life/api/api.php', {
      params: {
        //  THIS IS WHERE THE REQUIRED PARAMS FOR A CALL GO:
        //  for confirmEmail, that includes api key, request, email, and emailKey
        key: apiKey,
        request: 'confirmEmail',
        emailKey,
        email,
      },
    })
      .then(result => this.setState({
        //  see what results you will get here by looking at the JSON examples
        //  in the api doc for the request you are making
        results: result.data.result,
        message: result.data.message,
      }));
  }

  render() {
    const { results } = this.state;
    const { message } = this.state;
    if (!results) {
      return (
        <div className="User">
          <Form className="form" onSubmit={this.handleSubmit}>
            <h3>Confirm Email</h3>
            <small className="text-danger">
              {message}
            </small>
            <Button type="submit" block>
              Confirm Email
            </Button>
          </Form>
        </div>
      );
    }
    //  route back to index
    return (
      <div>
        Email Confirmed. Redirecting now.
        <Redirect to="/home" component={Home} />
      </div>

    );
  }
}

export default Confirm;
