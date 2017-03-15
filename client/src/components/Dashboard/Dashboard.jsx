import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Dashboard.scss';
import List from '../List/List.jsx';

const Dashboard = ({
  allLists,
  onCreateList,
  onCreateItem,
  onRemoveItem,
  onRemoveList,
}) => (
  <div>
    <h3 className={s.leyndo}>Dashboard</h3>
    <Link className={s.leyndo} to="/signout">Logout</Link>
    <h2>Space</h2>
    <form action="/" onSubmit={onCreateList} >
      <p>List</p>
      <input type="text" name="newName" />
      <input type="submit" value="Create" />
    </form>

    {allLists &&
      allLists.map(item =>
        <List
          list={item}
          key={item._id}
          onCreateItem={onCreateItem}
          onRemoveItem={onRemoveItem}
          onRemoveList={onRemoveList}
        />,
      )
    }
  </div>
);

Dashboard.propTypes = {
  allLists: PropTypes.any,
  onCreateList: PropTypes.func,
  onCreateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onRemoveList: PropTypes.func,
};

export default Dashboard;
