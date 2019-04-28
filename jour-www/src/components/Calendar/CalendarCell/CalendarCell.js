import React, { Component } from 'react';
import './CalendarCell.css';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class CalendarCell extends Component {
  setSelectedDate = () => {
    const { date } = this.props;
    this.props.dispatch({
      type: 'SELECTED_STATE',
      selectedDate: date,
    });
  };

  render() {
    const { date, selectedDate } = this.props;
    console.log('Object.keys(date).length :', Object.keys(date).length);

    return (
      <div className="CalendarCell" onClick={this.setSelectedDate}>
        <span
          className="small-text date"
          className={selectedDate.getDate() === date.getDate() ? 'selected' : ''}
          className={new Date().getMonth() !== date.getMonth() ? 'overflow' : ''}
        >
          {date.getDate()}
        </span>
      </div>
    );
  }
}

CalendarCell.propTypes = {
  date: PropTypes.object,
};

CalendarCell.defaultProps = {
  date: {},
};

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(CalendarCell);
