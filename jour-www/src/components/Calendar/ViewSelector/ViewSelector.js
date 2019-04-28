import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ViewSelector.css';

class ViewSelector extends Component {
  render() {
    const { leftArrowHandler, rightArrowHandler, title } = this.props;
    return (
      <div className="ViewSelector">
        <div className="navigation">
          {' '}
          <FontAwesomeIcon className="icon" icon="angle-left" onClick={leftArrowHandler} />
          <FontAwesomeIcon className="icon" icon="angle-right" onClick={rightArrowHandler} />
        </div>
        <div className="title">{title}</div>
        <div className="view">
          <FontAwesomeIcon
            id="weekViewIcon"
            className="icon"
            icon="th-large"
            onClick={this.setWeekView}
          />
          <FontAwesomeIcon
            id="monthViewIcon"
            className="icon"
            icon="calendar"
            onClick={this.setMonthView}
          />
        </div>
      </div>
    );
  }
}
export default ViewSelector;
