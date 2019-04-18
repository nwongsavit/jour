import React, { Component } from 'react';
import './Textarea.css';
import PropTypes from 'prop-types';

import TextareaAutosize from 'react-autosize-textarea';

class Textarea extends Component {
  render() {
    const { rows, placeholder, content } = this.props;
    return (
      <div className="Textarea">
        {/* <textarea
          rows={rows}
          placeholder={placeholder}
          defaultValue={content}
        /> */}
        <TextareaAutosize
          // rows={rows}
          placeholder={placeholder}
          defaultValue={content}
          style={{ minHeight: 24 }}
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
