import React, { PropTypes, Component } from 'react';
import s from './Bar.scss';

export default class Bar extends Component {

  render() {

    const {
      children,
      bottom,
    } = this.props;

    return (
      <div className={s('host', { bottom })}>
        {children}
      </div>
    );
  }
}

Bar.propTypes = {
  children: PropTypes.node,
  bottom: PropTypes.bool,
};
