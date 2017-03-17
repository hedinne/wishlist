import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import s from './Item.scss';

export default class Item extends Component {

  render() {
    const {
      to,
      children,
      logo,
    } = this.props;

    if (to) {
      return (
        <div className={s.host}>
          <Link to={to} className={s.link}>{children}</Link>
        </div>
      );
    }
    if (logo) {
      return (
        <div className={s.host}>
          <Link to="/" className={s.logo}>Wishlist</Link>
        </div>
      );
    }
    return (
      <div className={s.host}>
        <div className={s.link}>{children}</div>
      </div>
    );
  }
}

Item.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  logo: PropTypes.bool,
};
