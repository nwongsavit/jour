import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ViewSelector.css';

class ViewSelector extends Component {
  render() {
    const {
      setMonthView, setWeekView, leftArrowHandler, rightArrowHandler, title,
    } = this.props;
    return (
      <div className="ViewSelector">
        <div className="navigation">
          <FontAwesomeIcon className="icon" icon="angle-left" onClick={leftArrowHandler} />
          {title}
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
