import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  format, addDays, startOfWeek, endOfWeek,
} from 'date-fns';
import CalendarCellWeek from '../CalendarCellWeek/CalendarCellWeek';
import ViewSelector from '../ViewSelector/ViewSelector';
import './WeekView.css';

const apiKey = process.env.REACT_APP_API_KEY;
class WeekView extends Component {
  constructor() {
    super();
    this.state = {
      journalInfoWeek: [],
      taskInfoWeek: [],
    };
  }

  componentDidMount() {
    this.getJournalEntriesByWeek(this.props.selectedDate);
    this.getTasksByWeek();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDate !== this.props.selectedDate
      || prevProps.modalType !== this.props.modalType
    ) {
      this.getJournalEntriesByWeek(this.props.selectedDate);
      this.getTasksByWeek();
    }
  }

  getJournalEntriesByWeek() {
    const { uid, authKey, selectedDate } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getJournalsByYearWeek',
          uid,
          authKey,
          date: format(new Date(selectedDate), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        journalInfoWeek: result.data.journals,
      }));
  }

  getTasksByWeek() {
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
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          taskInfoWeek: result.data.tasks,
        },
        () => console.log('this.state.taskInfoWeek :', this.state.taskInfoWeek),
      ));
  }

  getTitle = () => {
    const { selectedDate } = this.props;
    const start = format(startOfWeek(selectedDate), 'MMMM DD, YYYY');
    const end = format(endOfWeek(selectedDate), 'MMMM DD, YYYY');

    return `${start} - ${end}`;
  };

  previousWeek = () => {
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

  renderWeekDays() {
    const { journalInfoWeek, taskInfoWeek } = this.state;
    const { selectedDate } = this.props;
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(weekStart);
    const rows = [];
    const days = [];
    let day = weekStart;

    let i = 0;
    let journalCount = 0;
    let taskCount = 0;

    while (day <= weekEnd) {
      if (journalInfoWeek) {
        journalCount = journalInfoWeek.filter(journal => journal.postDate.includes(format(day, 'YYYY-MM-DD')));
        journalCount = journalCount.length;
      }
      if (taskInfoWeek) {
        taskCount = taskInfoWeek.filter(task => task.task_date.includes(format(day, 'YYYY-MM-DD')));
        taskCount = taskCount.length;
      }
      days.push(
        <Col className="dateCol" key={i}>
          <CalendarCellWeek date={day} key={i} journalCount={journalCount} taskCount={taskCount} />
        </Col>,
      );
      day = addDays(day, 1);
      i += 1;
    }
    rows.push(<Row key={i}>{days}</Row>);

    return rows;
  }

  render() {
    return (
      <div className="WeekView">
        <div className="view-selector">
          <ViewSelector
            leftArrowHandler={this.previousWeek}
            rightArrowHandler={this.nextWeek}
            title={this.getTitle()}
            picker
          />
        </div>
        {this.renderWeekDays()}
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
