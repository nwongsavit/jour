import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MonthView.css';
import { Col, Row } from 'react-bootstrap';
import {
  startOfMonth, endOfMonth, addMonths, format, addDays,
} from 'date-fns';
import CalendarCell from '../CalendarCell/CalendarCell';
import ViewSelector from '../ViewSelector/ViewSelector';

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
        if (day.getDay() !== i || day.getMonth() !== currentMonth.getMonth()) {
          days.push(
            <Col className="dateCol">
              <CalendarCell date={0} />
            </Col>,
          );
        } else {
          days.push(
            <Col className="dateCol">
              <CalendarCell date={day} />
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

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, 1),
    });
  };

  previousMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, -1),
    });
  };

  getTitle = () => {
    const { currentMonth } = this.state;
    return format(currentMonth, 'MMMM YYYY');
  };

  render() {
    const { currentMonth } = this.state;
    const { setMonthView, setWeekView } = this.props;
    return (
      <div className="MonthView">
        <ViewSelector
          setMonthView={setMonthView}
          setWeekView={setWeekView}
          leftArrowHandler={this.previousMonth}
          rightArrowHandler={this.nextMonth}
          title={this.getTitle()}
          onClick={setMonthView}
        />

        <Row className="week-header week-day small-text">
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

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  selectedDate: state.selectedDate,
  modalType: state.modalType,
});

export default connect(mapStateToProps)(MonthView);
