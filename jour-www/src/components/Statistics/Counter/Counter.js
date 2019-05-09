import React, { Component } from 'react';
import './Counter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Counter extends Component {
  render() {
    const { number, item, icon } = this.props;
    return (
      <div className="Counter">
        <FontAwesomeIcon icon={icon} className="counter-icon" />
        <div className="content">
          <div className="number">{number}</div>
          <div className="small-text item">{item}</div>
        </div>
      </div>
    );
  }
}

export default Counter;
