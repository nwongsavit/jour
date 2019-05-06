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
    const {
      title, placeholder, onChange, checkbox,
    } = this.props;
    return (
      <div className="Task">
        {checkbox ? <input className="checkbox" type="checkbox" /> : ''}
        <Textarea
          rows={1}
          content={title}
          onCheck={this.onCheck}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
}

Task.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  checkbox: PropTypes.bool,
};

Task.defaultProps = {
  title: '',
  placeholder: '',
  checkbox: true,
};

export default Task;
