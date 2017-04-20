import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import s from './Item.scss';

export default class Item extends Component {
  render() {
    const { to, children, logo, className } = this.props;

    if (to) {
      return (
        <div className={s('host', className)}>
          <Link to={to}>{children}</Link>
        </div>
      );
    }
    if (logo) {
      return (
        <div className={s('host', 'logo', className)}>
          <Link to="/" className={s.logo}>Wishlist</Link>
        </div>
      );
    }
    return (
      <div className={s('host', className)}>
        <div>{children}</div>
      </div>
    );
  }
}

Item.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  logo: PropTypes.bool,
  className: PropTypes.any,
};
