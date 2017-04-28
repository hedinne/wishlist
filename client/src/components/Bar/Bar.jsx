import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Bar.scss';

export default class Bar extends Component {
  render() {
    const { children, bottom, className } = this.props;

    return (
      <div className={s('host', className, { bottom })}>
        {children}
      </div>
    );
  }
}

Bar.propTypes = {
  children: PropTypes.node,
  bottom: PropTypes.bool,
  className: PropTypes.any,
};
