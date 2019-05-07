import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import Input from '../Input/Input';

class Task extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      content: this.props.taskInfo.task,
    };
  }

  onChange = (e) => {
    // after every check, send api call
    console.log('e.target.value :', e.target.value);
    console.log('check');
  };

  handleInputChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    const { content } = this.state;
    const {
      placeholder, onChange, checkbox, taskInfo,
    } = this.props;
    return (
      <div className="Task" id={`task-${taskInfo.id}`}>
        <Input
          content={content}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onBlur={this.onCheck}
          checkbox={checkbox}
          completed={taskInfo.completed}
        />
      </div>
    );
  }
}

Task.propTypes = {
  placeholder: PropTypes.string,
  checkbox: PropTypes.bool,
};

Task.defaultProps = {
  placeholder: '',
  checkbox: true,
};

export default Task;
