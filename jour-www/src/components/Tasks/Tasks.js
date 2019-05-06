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
    if (tasks[0].id) {
      return tasks.map(task => <Task title={task.task} key={task.id} />);
    }
  }

  render() {
    const { tasks } = this.props;
    return (
      <div className="Tasks">
        <h3>Tasks</h3>
        {tasks && tasks.length && this.renderTasks()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Tasks);
