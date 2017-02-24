import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Input from '../Input/Input.jsx';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
}) => (
  <div>
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

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
        <input type="submit" value="Log in" />
      </div>

      <div>
        Dont have an account?
        <Link to={'/signup'}>Create one</Link>
      </div>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
