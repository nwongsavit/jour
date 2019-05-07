import React, { Component } from 'react';
import axios from 'axios';
import './Calendar.css';

import { format } from 'date-fns';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MonthView from './MonthView/MonthView';
import WeekView from './WeekView/WeekView';
import Task from '../Task/Task';
import Entries from '../Entries/Entries';
import Tasks from '../Tasks/Tasks';

const apiKey = process.env.REACT_APP_API_KEY;
class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      journalInfo: {},
      tasks: {},
      isMobile: window.innerWidth <= 767,
    };
  }

  componentWillMount() {
    document.title = "Jour - Calendar";
    window.addEventListener('resize', this.handleWindowSizeChange);
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ isMobile: window.innerWidth <= 767 });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDate !== this.props.selectedDate
      || prevProps.modalType !== this.props.modalType
    ) {
      this.getJournalEntries();
      this.getTasks();
    }
  }

  componentDidMount() {
    this.getJournalEntries();
    this.getTasks();
  }

  getTasks() {
    const { uid, authKey, selectedDate } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getTasksByYearWeek',
          uid,
          authKey,
          date: format(new Date(selectedDate), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        tasks: result.data.tasks,
      }));
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

  render() {
    const { journalInfo, isMobile, tasks } = this.state;
    const { selectedDate } = this.props;
    return (
      <div className="Calendar">
        {isMobile ? (
          <MonthView />
        ) : (
          <WeekView setWeekView={this.setWeekView} setMonthView={this.setMonthView} />
        )}

        <div className="agenda">
          <div className="small-text agendaDate">{format(selectedDate, 'MMMM DD, YYYY')}</div>
          <Entries journalInfo={journalInfo} />
          <Tasks tasks={tasks} />
          {/* <div className="tasks">
            <h3>Tasks</h3>
            <Task title="Finish presentation script" />
            <Task title="Practice presentation" />
            <Task title="Talk to team about homework" />
          </div> */}
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
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Calendar));
