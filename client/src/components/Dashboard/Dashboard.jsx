import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Dashboard.scss';

const Dashboard = ({ secretData }) => (
  <div>
    <h3 className={s.leyndo}>Dashboard</h3>

    {secretData && <p>{secretData}</p>}
    <Link to="/logout">logout</Link>
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
};

export default Dashboard;
