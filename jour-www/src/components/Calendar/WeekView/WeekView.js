import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  format, addDays, startOfWeek, endOfWeek,
} from 'date-fns';
import CalendarCellWeek from '../CalendarCellWeek/CalendarCellWeek';
import Task from '../../Task/Task';
import Entries from '../../Entries/Entries';
import ViewSelector from '../ViewSelector/ViewSelector';

const apiKey = process.env.REACT_APP_API_KEY;
class WeekView extends Component {
  constructor() {
    super();
    this.state = {
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

  renderWeekDays() {
    const { journalInfo } = this.state;
    const { selectedDate } = this.props;
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(weekStart);

    const rows = [];
    const days = [];
    let day = weekStart;

    let i = 0;

    while (day <= weekEnd) {
      days.push(
        <Col className="dateCol" key={i}>
          <CalendarCellWeek date={day} key={i} journalInfo={journalInfo} />
        </Col>,
      );
      day = addDays(day, 1);
      i += 1;
    }
    rows.push(<Row key={i}>{days}</Row>);

    return rows;
  }

  previousWeek = () => {
    console.log('previousWeek :');
    const { selectedDate } = this.props;
    let newDate = addDays(selectedDate, -7);
    newDate = startOfWeek(newDate);
    if (newDate === new Date()) {
      this.props.dispatch({
        type: 'SELECTED_STATE',
        selectedDate: new Date(),
      });
    } else {
      this.props.dispatch({
        type: 'SELECTED_STATE',
        selectedDate: newDate,
      });
    }
  };

  nextWeek = () => {
    const { selectedDate } = this.props;
    let newDate = addDays(selectedDate, 7);
    newDate = startOfWeek(newDate);
    if (newDate === new Date()) {
      this.props.dispatch({
        type: 'SELECTED_STATE',
        selectedDate: new Date(),
      });
    } else {
      this.props.dispatch({
        type: 'SELECTED_STATE',
        selectedDate: newDate,
      });
    }
  };

  getTitle = () => {
    const { selectedDate } = this.props;
    const start = format(startOfWeek(selectedDate), 'MMMM DD, YYYY');
    const end = format(endOfWeek(selectedDate), 'MMMM DD, YYYY');

    return `${start} - ${end}`;
  };

  render() {
    const { selectedDate } = this.props;
    const { journalInfo } = this.state;
    return (
      <div className="WeekView">
        <ViewSelector
          leftArrowHandler={this.previousWeek}
          rightArrowHandler={this.nextWeek}
          title={this.getTitle()}
        />
        {this.renderWeekDays()}
        <div className="agenda">
          <div className="small-text agendaDate">{format(selectedDate, 'MMMM DD, YYYY')}</div>
          <div className="mood">
            <Entries journalInfo={journalInfo} />
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
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  selectedDate: state.selectedDate,
  modalType: state.modalType,
});

export default connect(mapStateToProps)(WeekView);
