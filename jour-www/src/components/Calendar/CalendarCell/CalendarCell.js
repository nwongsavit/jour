import React, { Component } from 'react';
import './CalendarCell.css';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class CalendarCell extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  componentDidMount() {
    const { date, selectedDate } = this.props;
    if (date === selectedDate) {
      this.setState({
        selected: true,
      });
    }
  }

  setSelectedDate = () => {
    const { date } = this.props;
    this.props.dispatch({
      type: 'SELECTED_STATE',
      selectedDate: date,
    });
  };

  render() {
    const { date } = this.props;
    const { selected } = this.state;

    return (
      <div className="CalendarCell" onClick={this.setSelectedDate}>
        <span className="small-text date" className={selected ? 'selected' : ''}>
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

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(CalendarCell);
