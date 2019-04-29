import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ViewSelector.css';
import MonthView from '../MonthView/MonthView';

class ViewSelector extends Component {
  constructor() {
    super();
    this.state = {
      datePicker: false,
    };
  }

  openDatePicker = () => {
    const { picker } = this.props;
    if (picker) {
      this.setState({
        datePicker: !this.state.datePicker,
      });
    }
  };

  render() {
    const { datePicker } = this.state;
    const { leftArrowHandler, rightArrowHandler, title } = this.props;
    return (
      <div className="ViewSelector">
        <div className="navigation">
          <FontAwesomeIcon className="icon" icon="angle-left" onClick={leftArrowHandler} />
          <div className="title-container">
            <div className="title" onClick={this.openDatePicker}>
              {title}
            </div>
            {datePicker && (
              <div className="datePicker">
                <MonthView />
              </div>
            )}
          </div>
          <FontAwesomeIcon className="icon" icon="angle-right" onClick={rightArrowHandler} />
        </div>
        {/* <div className="view">
          <FontAwesomeIcon
            id="weekViewIcon"
            className="icon"
            icon="th-large"
            onClick={setWeekView}
          />
          <FontAwesomeIcon
            id="monthViewIcon"
            className="icon"
            icon="calendar"
            onClick={setMonthView}
          />
        </div> */}
      </div>
    );
  }
}
export default ViewSelector;
