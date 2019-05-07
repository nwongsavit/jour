import React, { Component } from 'react';
import './Add.css';
import Textbox from '../Textbox/Textbox';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Add extends Component {
  componentWillMount() {
    document.title = "Jour - Add";
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="Add">
        <Textbox />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Add));
