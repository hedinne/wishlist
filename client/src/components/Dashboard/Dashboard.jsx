import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Dashboard.scss';
import List from '../List/List.jsx';

const Dashboard = ({
  secretData,
  list,
  onSubmit,
  onChange,
}) => (
  <div>
    <h3 className={s.leyndo}>Dashboard</h3>

    {secretData && <p className={s.leyndo}>{secretData}</p>}
    <Link className={s.leyndo} to="/logout">Logout</Link>
    <List
      onSubmit={onSubmit}
      onChange={onChange}
      list={list}
    />
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  list: PropTypes.node,
};

export default Dashboard;
