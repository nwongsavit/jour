import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import { format } from 'date-fns';
import axios from 'axios';
import { connect } from 'react-redux';
import Task from './Task/Task';

const apiKey = process.env.REACT_APP_API_KEY;

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getTasksByYearWeek',
          uid,
          authKey,
          date: format(new Date(), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          tasks: result.data.journals,
        },
        () => {
          console.log('this.state.tasks :', this.state.tasks);
        },
      ));
  }

  renderTasks() {
    const { tasks } = this.state;

    if (tasks[0].id) {
      return tasks.map(journal => <Task content="hello" />);
    }
  }

  onCheck = () => {
    console.log('check');
  };

  addPlaceholderTask = () => {
    console.log('check');
  };

  render() {
    const { title } = this.props;
    return (
      <div className="Tasks">
        <h3>Tasks</h3>
        {/* <Task title="Finish presentation script" />
        <Task title="Practice presentation" />
        <Task title="Talk to team about homework" /> */}
        {this.renderTasks}
        <Task placeholder="Add a task" />
        <div className="addTask small-text" onClick={this.addPlaceholderTask}>
          <div className="plus">+</div>
          <div className="addText">Add task</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(Tasks);
