import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import s from './HomePage.scss';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';

export default class HomePage extends Component {
  render() {
    return (
      <div className={s.host}>
        <div className={s.hero}>
          <Bar>
            <Item to="/login" className={s.item}>Sign In</Item>
            <Item to="/register" className={s.item}>Register</Item>
          </Bar>

          <h1 className={s.title}>
            Wishlist
          </h1>

          <Bar bottom>
            <Item className={s.bottom}>
              <Scrollchor to="what" className={s.scrollLink}>What?</Scrollchor>
            </Item>
          </Bar>
        </div>

        <div className={s.what} id="what">
          <h2 className={s.heading}>What?</h2>
          <p className={s.text}>
            Wishlist is a app that helps you keep track of your wishlists and share
            them with thouse who are about to give you a gift.
          </p>
        </div>
      </div>
    );
  }
}
