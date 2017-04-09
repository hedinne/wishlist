import React, { PropTypes } from 'react';
import Input from '../Input/Input.jsx';
import s from './SignUpForm.scss';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <form action="/" onSubmit={onSubmit} className={s.host}>
    <h2 className={s.heading}>Register</h2>

    {errors.summary && <p className={s.errorMessage}>{errors.summary}</p>}

    <Input
      label="Name"
      name="name"
      errorText={errors.name}
      onChange={onChange}
      value={user.name}
      required
    />

    <Input
      label="Email"
      name="email"
      errorText={errors.email}
      onChange={onChange}
      value={user.email}
      required
    />

    <Input
      label="Password"
      name="password"
      errorText={errors.password}
      onChange={onChange}
      value={user.password}
    />

    <input type="submit" value="Create New Account" className={s.button} />

  </form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignUpForm;
