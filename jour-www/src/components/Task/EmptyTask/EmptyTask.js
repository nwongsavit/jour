import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EmptyTask.css';
import Input from '../../Input/Input';

class EmptyTask extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {};
  }

  // onChange = (e) => {
  //   // after every check, send api call
  //   console.log('e.target.value :', e.target.value);
  //   console.log('check');
  // };

  handleInputChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    const { content } = this.state;
    const {
      placeholder, onChange, checkbox, EmptyTaskInfo,
    } = this.props;
    return (
      <div className="EmptyTask" id={`task-${EmptyTaskInfo.id}`}>
        <Input placeholder="Add a task" onChange={onChange} />
      </div>
    );
  }
}

EmptyTask.propTypes = {
  placeholder: PropTypes.string,
  checkbox: PropTypes.bool,
  EmptyTaskInfo: PropTypes.object,
};

EmptyTask.defaultProps = {
  placeholder: '',
  checkbox: true,
  EmptyTaskInfo: {
    EmptyTask: '',
  },
};

export default EmptyTask;
