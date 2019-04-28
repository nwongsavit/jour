import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Calendar.css';

import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      monthView: false,
      weekView: true,
    };
  }

  setWeekView = () => {
    this.setState({
      monthView: false,
      weekView: true,
    });
  };

  setMonthView = () => {
    this.setState({
      monthView: true,
      weekView: false,
    });
  };

  render() {
    const { monthView, weekView } = this.state;
    return (
      <div className="Calendar">
        {monthView && <MonthView />}
        {weekView && <WeekView />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(Calendar);
