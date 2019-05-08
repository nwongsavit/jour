import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      results: '',
      message: '',
    };
  }

  toggleComplete = () => {
    const { completed } = this.state;
    const {
      uid, authKey, selectedDate, taskInfo,
    } = this.props;

    this.setState({
      completed: !completed,
    });

    console.log('completed :', completed);

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

  handleInputChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    const { content, completed } = this.state;
    const { placeholder, onChange, taskInfo } = this.props;
    return (
      <div className="Task" id={`task-${taskInfo.id}`}>
        <Input
          content={content}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onBlur={this.onCheck}
          checkbox
          completed={completed}
          onClick={this.toggleComplete}
        />
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
