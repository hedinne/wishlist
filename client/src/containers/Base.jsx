import React, { PropTypes, Component } from 'react';

export default class Base extends Component {

  render() {
    const { children } = this.props;

    return children;
  }
}

Base.propTypes = {
  children: PropTypes.node,
};
