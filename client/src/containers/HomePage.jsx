import React from 'react';
import { Link } from 'react-router';
import s from './HomePage.scss';
import Top from '../components/Top/Top.jsx';
import Bottom from '../components/Bottom/Bottom.jsx';


const HomePage = () => (
  <div className={s.host}>

    <Top>
      <Link to="/login" className={s.link}>
        Log in
      </Link>
      <div className={s.spacer}>x</div>
      <Link to="/signup" className={s.link}>
        Register
      </Link>
    </Top>

    <div className={s.title}>
      Wishlist
    </div>

    <Bottom>
      <Link to="/what" className={s.link}>
        What?
      </Link>
    </Bottom>
  </div>
);

export default HomePage;
