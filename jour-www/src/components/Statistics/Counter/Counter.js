import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
  render() {
    const { number, item } = this.props;
    return (
      <div className="Counter">
        <div className="number">{number}</div>
        <div className="small-text item">{item}</div>
      </div>
    );
  }
}

export default Counter;
