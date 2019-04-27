import React, { Component } from 'react';
import './Entries.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Entry from './Entry/Entry';

class Entries extends Component {
  render() {
    return (
      <div className="Entries">
        <Entry />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Entries);
