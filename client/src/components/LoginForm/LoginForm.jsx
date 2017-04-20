import React, { PropTypes } from 'react';
import Input from '../Input/Input.jsx';
import s from './LoginForm.scss';

const LoginForm = ({ onSubmit, onChange, errors, successMessage, user }) => (
  <form action="/" onSubmit={onSubmit} className={s.host}>
    <div className={s.container}>
      <h2 className={s.heading}>Sign In</h2>

      {successMessage && <p className={s.error}>{successMessage}</p>}
      {errors.summary && <p className={s.error}>{errors.summary}</p>}
    </div>

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
      required
    />

    <input type="submit" value="Log in" className={s.button} />
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
