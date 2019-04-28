import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  format, addDays, startOfWeek, endOfWeek,
} from 'date-fns';
import CalendarCellWeek from '../CalendarCellWeek/CalendarCellWeek';
import Task from '../../Task/Task';
import Entries from '../../Entries/Entries';

class WeekView extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
    };
  }

  renderWeekDays() {
    const { currentMonth } = this.state;
    const weekStart = startOfWeek(currentMonth);
    const weekEnd = endOfWeek(weekStart);

    const rows = [];
    const days = [];
    let day = weekStart;

    let i = 0;

    while (day <= weekEnd) {
      days.push(
        <Col className="dateCol" key={i}>
          <CalendarCellWeek date={day} key={i} />
        </Col>,
      );
      day = addDays(day, 1);
      i += 1;
    }
    rows.push(<Row key={i}>{days}</Row>);

    return rows;
  }

  render() {
    const { selectedDate, journalInfo } = this.props;
    return (
      <div className="WeekView">
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
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(WeekView);
