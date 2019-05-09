import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import { format } from 'date-fns';
import axios from 'axios';
import { connect } from 'react-redux';
import Task from '../Task/Task';

const apiKey = process.env.REACT_APP_API_KEY;

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      taskLayout: [],
    };
  }

  addPlaceholderTask = () => {
    this.setState(prev => ({
      taskLayout: [...prev.taskLayout, 'Add a task'],
    }));
  };

  renderTasks() {
    const { tasks } = this.props;
    if (tasks && tasks.length && tasks[0].id) {
      return tasks.map(task => (
        <Task title={task.task} key={task.id} taskInfo={task} force={this.props.force} />
      ));
    }
    return <div>No tasks</div>;
  }

  render() {
    const { taskLayout } = this.state;
    const { tasks } = this.props;
    return (
      <div className="Tasks">
        <h3>Tasks</h3>
        {this.renderTasks()}
        {taskLayout.map((task, i) => (
          <div id={`task-${i}`}>
            <Task placeholder={task} id={i} key={i} force={this.props.force} />
          </div>
        ))}
        {/* <div className="add-task small-text" onClick={this.addPlaceholderTask}>
          <div className="plus">+</div>
          <div className="add-text">Add a task</div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Tasks);
