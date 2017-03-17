import React, { PropTypes, Component } from 'react';
import s from './Dashboard.scss';
import List from '../List/List.jsx';

export default class Dashboard extends Component {


  render() {

    const {
      allLists,
      onCreateItem,
      onRemoveItem,
      onRemoveList,
    } = this.props;

    return (
      <div className={s.host}>

        {allLists && allLists.map(item =>
          <List
            list={item}
            key={item._id}
            onCreateItem={onCreateItem}
            onRemoveItem={onRemoveItem}
            onRemoveList={onRemoveList}
          />,
        )}
      </div>
    );
  }
}


Dashboard.propTypes = {
  allLists: PropTypes.any,
  onCreateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onRemoveList: PropTypes.func,
};
