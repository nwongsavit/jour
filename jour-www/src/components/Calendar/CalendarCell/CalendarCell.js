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

    return (
      <div className="CalendarCell" onClick={this.setSelectedDate}>
        {date !== 0 && (
          <span className="small-text date" className={selectedDate === date ? 'selected' : ''}>
            {date.getDate()}
          </span>
        )}
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
