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
    const { title, placeholder } = this.props;
    return (
      <div className="Task">
        <input className="checkbox" type="checkbox" />
        <Textarea rows={1} content={title} onCheck={this.onCheck} placeholder={placeholder} />
      </div>
    );
  }
}

Task.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

Task.defaultProps = {
  title: '',
  placeholder: '',
};

export default Task;
