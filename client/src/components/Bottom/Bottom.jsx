import React, { PropTypes } from 'react';
import s from './Bottom.scss';

const Bottom = ({ children }) => (
  <div className={s.host}>
    {children}
  </div>
);

Bottom.propTypes = {
  children: PropTypes.node,
};

export default Bottom;
