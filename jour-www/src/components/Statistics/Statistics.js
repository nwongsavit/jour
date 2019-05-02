import React, { Component } from 'react';
import './Statistics.css';

class Statistics extends Component {
  componentDidMount() {
    document.title = "Jour - Statistics";
  }
  render() {
    return (
      <div className="Statistics">
        Statistics
      </div>
    );
  }
}

export default Statistics;
