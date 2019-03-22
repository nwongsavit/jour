import React, { Component } from 'react';
import './CalendarCell.css';

import PropTypes from 'prop-types';

class CalendarCell extends Component {
  render() {
    const { date } = this.props;
    return (
      <div className="CalendarCell">
        <div className="smallText">{ date }</div>
      </div>
    );
  }
}

CalendarCell.propTypes = {
  date: PropTypes.string,
};

CalendarCell.defaultProps = {
  date: '',
};

export default CalendarCell;
