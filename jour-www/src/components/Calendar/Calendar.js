import React, { Component } from 'react';
import './Calendar.css';
import { Col, Row } from 'react-bootstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  startOfMonth, endOfMonth, addMonths, format, addDays,
} from 'date-fns';
import CalendarCell from './CalendarCell/CalendarCell';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      // selectedDate: new Date(),
    };
  }

  setNextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, 1),
    });
  };

  setPreviousMonth = () => {
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
            <Col className="dateCol"><CalendarCell /></Col>,
          ); // push an empty calendar cell
        } else {
          days.push(
            <Col className="dateCol" key={day.getDate()}><CalendarCell date={day.getDate()} /></Col>,
          );
          day = addDays(day, 1);
        }
      }
      rows.push(<Row>{ days }</Row>);
      days = [];
    }

    return rows;
  }

  render() {
    const { currentMonth } = this.state;
    return (
      <div className="Calendar">
        <div id="calendarHeader">
          {/* <div id="prev" class="" onClick={this.setPreviousMonth}>prev month</div>  */}
          <FontAwesomeIcon icon="pencil-alt" onClick={this.setPreviousMonth} />
          <div id="monthText">
            {' '}
            { format(currentMonth, 'MMMM YYYY') }
            {' '}
          </div>
          <FontAwesomeIcon icon="pencil-alt" onClick={this.setNextMonth} />
        </div>

        <Row>
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

export default Calendar;
