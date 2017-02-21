import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui';
import s from './Dashboard.scss';

const Dashboard = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication"
    />
    <p className={s.leyndo}>Blettatígur</p>

    {secretData && <CardText>{secretData}</CardText>}
    <Link to="/logout">logout</Link>
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
};

export default Dashboard;
