import React, { PropTypes } from 'react';
import s from './Input.scss';

function type(name) {
  switch (name) {
    case 'password':
      return 'password';
    default:
      return 'text';
  }
}

const Input = ({
  label,
  name,
  errorText,
  onChange,
  value,
}) => (
  <div className={s.host}>
    <label htmlFor={label} className={s.label}>{label}</label>
    <input
      type={type(name)}
      name={name}
      id={label}
      onChange={onChange}
      value={value}
      className={s.input}
    />
    {errorText && <div className={s.error}>{errorText}</div>}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default Input;
