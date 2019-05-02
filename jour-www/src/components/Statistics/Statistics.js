import React, { Component } from 'react';
import './Statistics.css';
import { connect } from 'react-redux';

class Statistics extends Component {
  render() {
    return (
      <div className="Statistics">
        Statistics


          <div className="dayCounter">
          Days Signed Up:
          </div>

          <div className="entryCounter">
          Entries:
          </div>

          <div className="emoteCounter">
          Days Feeling Happy:
          Days Feeling Sad:
          Days Feeling Angry:
          Days Feeling Anxious:
          Days Feeling Confident:
          Days Feeling Nostalgic:
          </div>

          <div className="tasksCompleted">
          Tasks Completed:
          </div>




      </div>
    );
  }
}

export default Statistics;
