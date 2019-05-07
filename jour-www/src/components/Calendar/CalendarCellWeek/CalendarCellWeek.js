import React, { Component } from 'react';
import './CalendarCellWeek.css';
import { connect } from 'react-redux';
import { format, startOfWeek } from 'date-fns';
import PropTypes from 'prop-types';

class CalendarCellWeek extends Component {
  setSelectedDate = () => {
    const { date } = this.props;
    this.props.dispatch({
      type: 'SELECTED_STATE',
      selectedDate: date,
    });
  };

  render() {
    const {
      date, selectedDate, journalCount, taskCount,
    } = this.props;

    return (
      <div className="CalendarCellWeek" onClick={this.setSelectedDate}>
        <div
          className={
            selectedDate.getDate() === date.getDate() ? 'week-header selected' : 'week-header'
          }
        >
          <div
            className={
              selectedDate.getDate() === date.getDate() ? 'selected-circle circle' : 'circle'
            }
          />
          <div className="small-text week-day">{format(date, 'dddd')}</div>
          <div className="week-date">{format(date, 'MM/DD')}</div>
        </div>

        <div
          className={
            date.getDate() === startOfWeek(date).getDate() ? 'week-content first' : 'week-content'
          }
        >
          {/* <div className="mood-circles">
            <div className="selected-circle circle" />
          </div> */}
          <div className="journals-count pill">
            {journalCount}
            {' '}
Journals
          </div>
          <div className="tasks-count pill">
            {taskCount}
            {' '}
Tasks
          </div>
        </div>
      </div>
    );
  }
}

CalendarCellWeek.propTypes = {
  date: PropTypes.object,
  journalCount: PropTypes.number,
};

CalendarCellWeek.defaultProps = {
  date: {},
  journalCount: 0,
};

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(CalendarCellWeek);
