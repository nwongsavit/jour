import React, { Component } from 'react';
import './Textarea.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Textarea extends Component {
  render() {
    const {
      rows, placeholder, content, onChange, onBlur,
    } = this.props;
    return (
      <div className="Textarea">
        <textarea
          rows={rows}
          placeholder={placeholder}
          defaultValue={content}
          onChange={onChange}
          onBlur={onBlur}
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

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Textarea);
