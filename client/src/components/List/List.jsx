import React, { PropTypes } from 'react';

const List = ({
  list,
  onCreateItem,
}) => (
  <div>
    <h4>{list.title}</h4>
    <ul>

      {list.listItems.map(item => (
        <li key={item._id}>{item.title}</li>
      ))}
    </ul>

    <form action="/" onSubmit={onCreateItem} id={list._id} name="form" >
      <p>Item</p>
      <input type="text" name="newItem" />
      <input type="submit" value="Create" />
    </form>
  </div>
);

List.propTypes = {
  // onSubmit: PropTypes.func,
  list: PropTypes.any,
  onCreateItem: PropTypes.func,
};

export default List;
