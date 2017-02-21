import React, { PropTypes } from 'react';
import s from './Top.scss';

const Top = ({ children }) => (
  <div className={s.host}>
    {children}
  </div>
);

Top.propTypes = {
  children: PropTypes.node,
};

export default Top;
