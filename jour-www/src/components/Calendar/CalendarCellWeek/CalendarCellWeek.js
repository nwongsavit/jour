import React, { Component } from 'react';
import './CalendarCellWeek.css';
import { connect } from 'react-redux';
import {
  startOfMonth, endOfMonth, addMonths, format, addDays,
} from 'date-fns';
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
        <div
          className={
            selectedDate.getDate() === date.getDate() ? 'week-header selected' : 'week-header'
          }
        >
          <div className="small-text week-day">{format(date, 'dddd')}</div>
          <div
            className="week-date"
            //   className={selectedDate.getDate() === date.getDate() ? 'selected' : ''}
          >
            {format(date, 'MM/DD')}
          </div>
        </div>

        <div className="week-content">asdf</div>
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
