import React, { Component } from 'react';
import './CalendarCellWeek.css';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

class CalendarCellWeek extends Component {
  setSelectedDate = () => {
    const { date } = this.props;
    this.props.dispatch({
      type: 'SELECTED_STATE',
      selectedDate: date,
    });
  };

  getJournalLength = () => {
    // const { date, journalInfo } = this.props;
    // console.log('journalInfo :', date.getDate(), journalInfo);
    // if (journalInfo[0] === 0) {
    //   return 'inside';
    // }
    // return 'empty';
  };

  render() {
    const { date, selectedDate, journalInfo } = this.props;

    return (
      <div className="CalendarCellWeek" onClick={this.setSelectedDate}>
        <div
          className={
            selectedDate.getDate() === date.getDate() ? 'week-header selected' : 'week-header'
          }
        >
          <div className="small-text week-day">{format(date, 'dddd')}</div>
          <div className="week-date">{format(date, 'MM/DD')}</div>
        </div>

        <div className="week-content">{this.getJournalLength()}</div>
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
