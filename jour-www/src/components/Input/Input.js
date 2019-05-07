import React, { Component } from 'react';
import './Input.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Input extends Component {
  render() {
    const {
      rows, placeholder, content, onChange, onBlur, checkbox, completed,
    } = this.props;
    return (
      <div className="Input">
        {checkbox ? <input className="checkbox" type="checkbox" checked={completed} /> : ''}
        <input
          type="text"
          placeholder={placeholder}
          value={content}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Input);
