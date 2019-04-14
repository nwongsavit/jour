import React, { Component } from 'react';
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

const FEELING_TEXT = 'I\'m feeling...';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      monthView: false,
      weekView: true,
      // selectedDate: new Date(),
    };
  }

  // setDayView = () => {
  //   const { monthView, weekView, dayView } = this.state;
  //   this.setState({
  //     monthView: false,
  //     weekView: false,
  //     dayView: true
  //   });
  // };

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
  // setSelectedDate = date => {
  //   console.log('date :', date);
  //   // this.setState({

  //   // })
  // }
  renderMonthView() {
    const { currentMonth } = this.state;
    return (
      <div id="monthView">
        <div id="calendarHeader">
          <FontAwesomeIcon
            id="prev"
            icon="angle-left"
            onClick={this.previous}
          />
          <div id="monthText">
            {' '}
            {format(currentMonth, 'MMMM YYYY')}
            {' '}
          </div>
          <FontAwesomeIcon id="next" icon="angle-right" onClick={this.next} />
        </div>

        <Row className="daysOfTheWeek smallText">
          <Col>Sunday</Col>
          <Col>Monday</Col>
          <Col>Tuesday</Col>
          <Col>Wednesday</Col>
          <Col>Thursday</Col>
          <Col>Friday</Col>
          <Col>Saturday</Col>
        </Row>

        {this.renderMonthDays()}
      </div>
    );
  }

  renderMonthDays() {
    const { currentMonth } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);

    const rows = [];
    let days = [];
    let day = monthStart;

    while (day <= monthEnd) {
      // const cloneDay = day;
      for (let i = 0; i < 7; i += 1) {
        if (day.getDay() !== i || day.getMonth() !== monthStart.getMonth()) {
          days.push(
            <Col className="dateCol">
              <CalendarCell />
            </Col>,
          ); // push an empty calendar cell
        } else {
          days.push(
            <Col className="dateCol" key={day.getDate()}>
              <CalendarCell date={day.getDate()} />
            </Col>,
          );
          day = addDays(day, 1);
        }
      }
      rows.push(<Row>{days}</Row>);
      days = [];
    }

    return rows;
  }

  renderWeekView() {
    const { currentMonth } = this.state;
    return (
      <div id="weekView">
        {this.renderWeekDays()}
        <div className="agenda">
          <div className="smallText agendaDate">
            {format(currentMonth, 'MMMM DD, YYYY')}
          </div>
          <div className="mood">
            <div className="moodHeader">
              <h3 className="moodTitle">{FEELING_TEXT}</h3>
              <FontAwesomeIcon id="next" icon="pencil-alt" />
            </div>
            <textarea rows="4">
              {
                'In psychology, a mood is an emotional state. In contrast to emotions, feelings, or affects, moods are less specific, less intense and less likely to be provoked or instantiated by a particular stimulus or event. Moods are typically described as having either a positive or negative valence. In other words, people usually talk about being in a good mood or a bad mood.'
              }
            </textarea>
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

    while (day <= weekEnd) {
      if (day.getMonth() !== weekStart.getMonth()) {
        days.push(
          <Col className="dateCol">
            <CalendarCell />
          </Col>,
        ); // push an empty calendar cell
      } else {
        days.push(
          <Col className="dateCol" key={day.getDate()}>
            <CalendarCell date={day.getDate()} />
          </Col>,
        );
        day = addDays(day, 1);
      }
    }
    rows.push(<Row>{days}</Row>);
    days = [];

    return rows;
  }

  // renderDayView() {
  //   return <div id="todaysTasksHeader">Today's Tasks</div>;
  // }

  render() {
    const { monthView, weekView } = this.state;
    return (
      <div className="Calendar">
        <div className="viewSelector">
          <FontAwesomeIcon
            id="weekViewIcon"
            icon="th-large"
            onClick={this.setWeekView}
          />
          <FontAwesomeIcon
            id="monthViewIcon"
            icon="calendar"
            onClick={this.setMonthView}
          />
        </div>
        {monthView && this.renderMonthView()}
        {weekView && this.renderWeekView()}
      </div>
    );
  }
}

export default Calendar;
