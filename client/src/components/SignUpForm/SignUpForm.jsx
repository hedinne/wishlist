import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Input from '../Input/Input.jsx';
import s from './SignUpForm.scss';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className={s.host}>
    <form action="/" onSubmit={onSubmit}>
      <h3>Sign Up</h3>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div>
        <Input
          label="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div>
        <Input
          label="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div>
        <Input
          label="Password"
          name="password"
          errorText={errors.password}
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div>
        <input type="submit" value="Create New Account" />
      </div>

      <div>
        Already have an account?
        <Link to={'/login'}>Log in</Link>
      </div>

    </form>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignUpForm;
