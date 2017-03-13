import React, { PropTypes } from 'react';

const List = ({ onSubmit, onChange, list }) => (
  <div>
    {list && (
      <ul>
        {list.map((item, index) => <li key={`key${index}`}>{item}</li>)}
      </ul>
    )}

    <form
      action="/"
      onSubmit={onSubmit}
    >
      <input type="text" name="newItem" onChange={onChange} id="theNewGuy" />
      <input type="submit" value="Send" />
    </form>
  </div>
);

List.propTypes = {
  onSubmit: PropTypes.func,
  list: PropTypes.node,
  onChange: PropTypes.func,
};

export default List;
