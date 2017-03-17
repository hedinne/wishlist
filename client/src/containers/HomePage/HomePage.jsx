import React, { Component } from 'react';
import s from './HomePage.scss';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';

export default class HomePage extends Component {

  render() {
    return (
      <div className={s.host}>

        <Bar>
          <Item to="/login">Sign In</Item>
          <Item to="/register">Register</Item>
        </Bar>

        <div className={s.title}>
          Wishlist
        </div>

        <Bar bottom>
          <Item to="/what">What?</Item>
        </Bar>
      </div>
    );
  }
}
