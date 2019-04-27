import React, { Component } from 'react';
import './User.css';

class ForgotPassword extends Component {
  render() {
    return (
      <div className="ForgotPassword">
        Forgot Password
      <head>
        Forgot Your Password?
      </head>
      <body>
        <h3>Please enter your email.</h3>

            <div class="field-wrap">
                <label>
                    Email<span class="req">*</span>
                </label>
                <input type="email" required autocomplete="off"/>
            </div>

            <button type="submit" class="button button-block">Search</button>
      </body>

      </div>
    );
  }
}

export default ForgotPassword;
