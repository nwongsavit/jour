import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import Textarea from '../Textarea/Textarea';

class Task extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="Task">
        <Textarea rows={1} content={title} />
        {/* <input className="checkbox" type="checkbox" />
        {title} */}
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
