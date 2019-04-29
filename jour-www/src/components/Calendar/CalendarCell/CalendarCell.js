import React, { Component } from 'react';
import './CalendarCell.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CalendarCell extends Component {
  setSelectedDate = () => {
    const { date } = this.props;
    if (date !== 0) {
      this.props.dispatch({
        type: 'SELECTED_STATE',
        selectedDate: date,
      });
    }
  };

  setCellClasses = () => {
    const { date, selectedDate } = this.props;
    if (date === 0) {
      return '';
    }
    let classes = 'CalendarCell';
    classes += selectedDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) ? ' selected' : '';
    classes += new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) ? ' today' : '';
    return classes;
  };

  render() {
    const { date, selectedDate } = this.props;
    return (
      <div className={this.setCellClasses()} onClick={this.setSelectedDate}>
        {date !== 0 && <span className="small-text date">{date.getDate()}</span>}
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
