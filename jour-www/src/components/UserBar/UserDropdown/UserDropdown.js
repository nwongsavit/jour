import React, { Component } from 'react';
import './UserDropdown.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
    };
  }

  handleLogInClick(e) {
    e.preventDefault();
    this.props.history.push('/login');
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this.props.dispatch({
        type: 'LOGOUT',
      });
    }
  }

  render() {
    return (
      <div className="UserDropdown">
        <div className="logout-button" onClick={this.handleLogInClick}>
          Logout
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(UserDropdown));
