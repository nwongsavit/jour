import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import './Calendar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';

const apiKey = process.env.REACT_APP_API_KEY;
class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      monthView: false,
      weekView: true,
      journalInfo: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDate !== this.props.selectedDate
      || prevProps.modalType !== this.props.modalType
    ) this.getJournalEntries();
  }

  componentDidMount() {
    this.getJournalEntries();
  }

  getJournalEntries() {
    const { uid, authKey, selectedDate } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getJournalsByDate',
          uid,
          authKey,
          date: format(new Date(selectedDate), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        journalInfo: result.data.journals,
      }));
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
    const { monthView, weekView, journalInfo } = this.state;
    return (
      <div className="Calendar">
        <div className="viewSelector">
          <FontAwesomeIcon id="weekViewIcon" icon="th-large" onClick={this.setWeekView} />
          <FontAwesomeIcon id="monthViewIcon" icon="calendar" onClick={this.setMonthView} />
        </div>
        {monthView && <MonthView />}
        {weekView && <WeekView journalInfo={journalInfo} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  selectedDate: state.selectedDate,
  modalType: state.modalType,
});

export default connect(mapStateToProps)(Calendar);
