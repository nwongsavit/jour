import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import { format } from 'date-fns';
import axios from 'axios';
import { connect } from 'react-redux';
import Task from '../Task/Task';

const apiKey = process.env.REACT_APP_API_KEY;

class Tasks extends Component {
  renderTasks() {
    const { tasks } = this.props;
    if (tasks && tasks.length && tasks[0].id) {
      return tasks.map(task => <Task title={task.task} key={task.id} />);
    }
    return <div>No tasks</div>;
  }

  render() {
    const { tasks } = this.props;
    return (
      <div className="Tasks">
        <h3>Tasks</h3>
        {this.renderTasks()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Tasks);
