import React from 'react';
import s from './HomePage.scss';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';


const HomePage = () => (
  <div className={s.host}>

    <Bar>
      <Item to="/signin">Sign In</Item>
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

export default HomePage;
