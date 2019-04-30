import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import Textarea from '../Textarea/Textarea';

class Task extends Component {
  onCheck = () => {
    // after every check, send api call
    console.log('check');
  };

  render() {
    const { title } = this.props;
    return (
      <div className="Task">
        <input className="checkbox" type="checkbox" />
        <Textarea rows={1} content={title} onCheck={this.onCheck} />
      </div>
    );
  }
}

Task.propTypes = {
  title: PropTypes.string,
};

Task.defaultProps = {
  title: '',
};

export default Task;
