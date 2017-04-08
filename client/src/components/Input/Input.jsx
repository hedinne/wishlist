import React, { PropTypes, Component } from 'react';
import s from './Input.scss';

function type(name) {
  switch (name) {
    case 'password':
      return 'password';
    default:
      return 'text';
  }
}

export default class Input extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      focus: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      focus: true,
    });
  }

  onBlur(e) {
    if (!e.target.value) {
      this.setState({
        focus: false,
      });
    }
  }

  render() {
    const {
      label,
      name,
      errorText,
      onChange,
      value,
      required,
    } = this.props;

    return (
      <div className={s.host}>
        <label
          htmlFor={label}
          className={s('label', { 'label--active': this.state.focus })}
        >
          {label}
        </label>
        <input
          type={type(name)}
          name={name}
          id={label}
          onChange={onChange}
          value={value}
          className={s('input', { 'input--active': this.state.focus })}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {errorText && <div className={s.error}>{errorText}</div>}
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  required: PropTypes.bool,
};
