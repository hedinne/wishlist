import React, { PropTypes } from 'react';

const List = ({
  list,
  onCreateItem,
  onRemoveItem,
  onRemoveList,
}) => (
  <div>
    <h4>
      {list.title}
      <span>
        <button onClick={onRemoveList} name={list._id}> X</button>
      </span>
    </h4>

    <ul>
      {list.listItems &&
        list.listItems.map(item => (
          <li key={item._id}>
            <span><button onClick={onRemoveItem} name={`${item._id}_${list._id}`}>X </button> </span>
            {item.title}
          </li>
        ))
      }
    </ul>

    <form action="/" onSubmit={onCreateItem} id={list._id} name="form" >
      <p>Item</p>
      <input type="text" name="newItem" />
      <input type="submit" value="Create" />
    </form>
  </div>
);

List.propTypes = {
  list: PropTypes.any,
  onCreateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onRemoveList: PropTypes.func,
};

export default List;
