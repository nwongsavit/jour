import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Calendar.css';
import { Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  format,
  addDays,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import CalendarCell from './CalendarCell/CalendarCell';
import Task from '../Task/Task';
import Textarea from '../Textarea/Textarea';
import MonthView from './MonthView/MonthView';

const FEELING_TEXT = 'I\'m feeling...';
const apiKey = process.env.REACT_APP_API_KEY;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      monthView: false,
      weekView: true,
      journalInfo: {},
      results: '',
      message: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDate !== this.props.selectedDate) this.getJournalEntries();
  }

  componentDidMount() {
    this.getJournalEntries();
  }

  getJournalEntries() {
    console.log('getting :');
    const { currentMonth } = this.state;
    const { uid, authKey, selectedDate } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getJournalsByDate',
          uid,
          authKey,
          date: format(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate),
            'YYYY-MM-DD',
          ),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        journalInfo: result.data.journals,
      }));

    console.log('this.state.journalInfo :', this.state.journalInfo);
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

  next = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, 1),
    });
  };

  previous = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, -1),
    });
  };

  getJournalEntry = () => {
    const { journalInfo } = this.state;
    return journalInfo.length > 0 ? journalInfo[0].journal : '';
  };

  renderWeekView() {
    const { currentMonth, journalInfo } = this.state;
    return (
      <div id="weekView">
        {this.renderWeekDays()}
        <div className="agenda">
          <div className="smallText agendaDate">{format(currentMonth, 'MMMM DD, YYYY')}</div>
          <div className="mood">
            <div className="moodHeader">
              <h3 className="moodTitle">{FEELING_TEXT}</h3>
              <FontAwesomeIcon id="next" icon="pencil-alt" />
            </div>
            {journalInfo.length && (
              <Textarea rows={4} content={journalInfo[0].journal} key={journalInfo[0].id} />
            )}
          </div>
          <div className="tasks">
            <h3>I need to...</h3>
            <Task title="Finish presentation script" />
            <Task title="Practice presentation" />
            <Task title="Talk to team about homework" />
          </div>
        </div>
      </div>
    );
  }

  renderWeekDays() {
    const { currentMonth } = this.state;
    const weekStart = startOfWeek(currentMonth);
    const weekEnd = endOfWeek(weekStart);

    const rows = [];
    let days = [];
    let day = weekStart;

    let i = 0;

    while (day <= weekEnd) {
      if (day.getMonth() !== weekStart.getMonth()) {
        days.push(
          <Col className="dateCol" key={i}>
            <CalendarCell key={i} />
          </Col>,
        ); // push an empty calendar cell
      } else {
        days.push(
          <Col className="dateCol" key={i}>
            <CalendarCell date={day.getDate()} key={i} />
          </Col>,
        );
        day = addDays(day, 1);
      }
      i += 1;
    }
    rows.push(<Row key={i}>{days}</Row>);
    days = [];

    return rows;
  }

  render() {
    const { monthView, weekView } = this.state;
    return (
      <div className="Calendar">
        <div className="viewSelector">
          <FontAwesomeIcon id="weekViewIcon" icon="th-large" onClick={this.setWeekView} />
          <FontAwesomeIcon id="monthViewIcon" icon="calendar" onClick={this.setMonthView} />
        </div>
        {monthView && <MonthView />}
        {weekView && this.renderWeekView()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Calendar);
