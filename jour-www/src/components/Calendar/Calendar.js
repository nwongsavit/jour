import React, { Component } from 'react';
import axios from 'axios';
import './Calendar.css';

import { format } from 'date-fns';
import { connect } from 'react-redux';
import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';
import Task from '../Task/Task';
import Entries from '../Entries/Entries';

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
    const { selectedDate } = this.props;
    return (
      <div className="Calendar">
        {monthView && <MonthView setWeekView={this.setWeekView} setMonthView={this.setMonthView} />}
        {weekView && <WeekView setWeekView={this.setWeekView} setMonthView={this.setMonthView} />}

        <div className="agenda">
          <div className="small-text agendaDate">{format(selectedDate, 'MMMM DD, YYYY')}</div>
          <div className="mood">
            <Entries journalInfo={journalInfo} />
          </div>
          <div className="tasks">
            <h3>Tasks</h3>
            <Task title="Finish presentation script" />
            <Task title="Practice presentation" />
            <Task title="Talk to team about homework" />
          </div>
        </div>
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
