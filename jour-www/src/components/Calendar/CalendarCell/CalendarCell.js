import React, { Component } from 'react';
import './CalendarCell.css';

import PropTypes from 'prop-types';

class CalendarCell extends Component {
  constructor() {
    super();
    this.state = {
      today: false,
    };
  }

  componentDidMount() {
    const { date } = this.props;
    if (date === new Date().getDate()) {
      this.setState({
        today: true,
      });
    }
  }

  render() {
    const { date } = this.props;
    const { today } = this.state;

    return (
      <div className="CalendarCell">
        <span className="smallText date" id={today ? 'today' : ''}>
          {date}
        </span>
      </div>
    );
  }
}

CalendarCell.propTypes = {
  date: PropTypes.number,
};

CalendarCell.defaultProps = {
  date: 0,
};

export default CalendarCell;
