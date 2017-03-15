import React, { PropTypes, Component } from 'react';
import s from './Base.scss';

export default class Base extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className={s.host}>
        {children}
      </div>
    );
  }
}

Base.propTypes = {
  children: PropTypes.node,
};
