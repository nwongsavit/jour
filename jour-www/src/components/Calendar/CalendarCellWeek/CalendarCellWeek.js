import React, { Component } from 'react';
import './CalendarCellWeek.css';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class CalendarCellWeek extends Component {
  constructor() {
    super();
  }

  setSelectedDate = () => {
    const { date } = this.props;
    this.props.dispatch({
      type: 'SELECTED_STATE',
      selectedDate: date,
    });
  };

  render() {
    const { date, selectedDate } = this.props;

    return (
      <div className="CalendarCellWeek" onClick={this.setSelectedDate}>
        <span
          className="smallText date"
          className={selectedDate.getDate() === date.getDate() ? 'selected' : ''}
        >
          {date.getDate()}
        </span>
      </div>
    );
  }
}

CalendarCellWeek.propTypes = {
  date: PropTypes.object,
};

CalendarCellWeek.defaultProps = {
  date: {},
};

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(CalendarCellWeek);
