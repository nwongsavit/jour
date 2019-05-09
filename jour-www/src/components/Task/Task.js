import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './Task.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../Input/Input';

const apiKey = process.env.REACT_APP_API_KEY;
class Task extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      content: this.props.taskInfo.task || '',
      completed: this.props.taskInfo.completed,
      actionBar: false,
      results: '',
      message: '',
    };
  }

  handleDelete = () => {
    const { uid, authKey, taskInfo } = this.props;

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'deleteTask',
          uid,
          authKey,
          tid: taskInfo.id,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          console.log('this.state.message :', this.state.message);
          this.closeActionBar();
          this.props.force();
        },
      ));
  };

  handleSave = () => {
    const { content } = this.state;
    const { uid, authKey, taskInfo } = this.props;

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'editTask',
          uid,
          authKey,
          task: content,
          tid: taskInfo.id,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          console.log('this.state.message :', this.state.message);
          this.closeActionBar();
        },
      ));
  };

  toggleComplete = () => {
    const { completed } = this.state;
    const {
      uid, authKey, selectedDate, taskInfo,
    } = this.props;

    this.setState({
      completed: !completed,
    });

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'toggleTasksCompleted',
          uid,
          authKey,
          tid: taskInfo.id,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          console.log('this.state.message :', this.state.message);
        },
      ));
  };

  closeActionBar = () => {
    this.setState({
      actionBar: false,
    });
  };

  toggleActionBar = () => {
    this.setState({
      actionBar: !this.state.actionBar,
    });
  };

  handleInputChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    const { content, completed, actionBar } = this.state;
    const { placeholder, onChange, taskInfo } = this.props;
    return (
      <div className="Task" id={`task-${taskInfo.id}`}>
        <Input
          content={content}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onFocus={this.toggleActionBar}
          onBlur={this.toggleActionBar}
          checkbox
          completed={completed}
          onClick={this.toggleComplete}
        />
        {actionBar ? (
          <div className="action-bar">
            <Button onMouseDown={this.handleSave}>Save</Button>
            <Button variant="danger" onMouseDown={this.handleDelete}>
              Delete
            </Button>
            <Button variant="light" onClick={this.toggleActionBar}>
              Cancel
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

Task.propTypes = {
  placeholder: PropTypes.string,
  checkbox: PropTypes.bool,
  taskInfo: PropTypes.object,
};

Task.defaultProps = {
  placeholder: '',
  checkbox: true,
  taskInfo: {
    task: '',
  },
};

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(Task);
