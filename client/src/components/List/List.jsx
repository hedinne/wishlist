import React, { PropTypes } from 'react';

const List = ({ list }) => (
  <div>
    <h4>{list.title}</h4>

    {/* <ul>
      {list.map(item => <li key={item._id}>{item.title}</li>)}
    </ul> */}
  </div>
);

List.propTypes = {
  // onSubmit: PropTypes.func,
  list: PropTypes.any,
  // onChange: PropTypes.func,
};

export default List;
