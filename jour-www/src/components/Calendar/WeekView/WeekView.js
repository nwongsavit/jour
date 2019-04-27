import React, { Component } from 'react';
import './WeekView.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  format, addDays, startOfWeek, endOfWeek,
} from 'date-fns';
import CalendarCell from '../CalendarCell/CalendarCell';
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
    const { currentMonth } = this.state;
    return (
      <div className="WeekView">
        {this.renderWeekDays()}
        <div className="agenda">
          <div className="small-text agendaDate">{format(currentMonth, 'MMMM DD, YYYY')}</div>
          <div className="mood">
            <Entries />
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

export default WeekView;
