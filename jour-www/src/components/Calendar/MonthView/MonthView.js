import React, { Component } from 'react';
import './MonthView.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  startOfMonth, endOfMonth, addMonths, format, addDays,
} from 'date-fns';
import CalendarCell from '../CalendarCell/CalendarCell';

class MonthView extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
    };
  }

  renderMonthDays() {
    const { currentMonth } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);

    const rows = [];
    let days = [];
    let day = monthStart;

    while (day <= monthEnd) {
      for (let i = 0; i < 7; i += 1) {
        days.push(
          <Col className="dateCol">
            <CalendarCell date={day} />
          </Col>,
        );
        day = addDays(day, 1);
      }
      rows.push(<Row>{days}</Row>);
      days = [];
    }

    return rows;
  }

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

  render() {
    const { currentMonth } = this.state;
    return (
      <div className="MonthView">
        <div id="calendarHeader">
          <FontAwesomeIcon id="prev" icon="angle-left" onClick={this.previous} />
          <div id="monthText">
            {' '}
            {format(currentMonth, 'MMMM YYYY')}
            {' '}
          </div>
          <FontAwesomeIcon id="next" icon="angle-right" onClick={this.next} />
        </div>

        <Row className="daysOfTheWeek small-text">
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
}

export default MonthView;
