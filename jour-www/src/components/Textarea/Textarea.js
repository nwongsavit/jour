import React, { Component } from 'react';
import './Textarea.css';
import PropTypes from 'prop-types';

class Textarea extends Component {
  render() {
    const {
      rows, placeholder, content, onChange,
    } = this.props;
    return (
      <div className="Textarea">
        <textarea
          rows={rows}
          placeholder={placeholder}
          defaultValue={content}
          onChange={onChange}
        />
      </div>
    );
  }
}

Textarea.propTypes = {
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  content: PropTypes.string,
};

Textarea.defaultProps = {
  rows: 1,
  placeholder: '',
  content: '',
};

export default Textarea;
