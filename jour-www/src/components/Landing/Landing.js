import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Landing.css';
import Login from '../User/Login';

class Landing extends Component {
  componentWillMount() {
    document.title = "Jour - Welcome";
  }

  render() {
    return (
      <div className="Landing">
        <h3>Landing</h3>
        <p>Test</p>
        <Login />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Landing));
