import React, { PropTypes } from 'react';
import s from './Details.scss';

const Details = ({
  onChangeNewItem,
  onCreateItem,
  listID,
}) => (
  <div className={s.host}>
    <form onChange={onChangeNewItem} onSubmit={onCreateItem}>
      <label htmlFor>
        Title
        <input type="text" name="title" id={`${listID}_title`} />
      </label>
      <br />
      <label htmlFor>
        Description
        <input type="text" name="description" id={`${listID}_description`} />
      </label>
      <br />

      <label htmlFor>
        Link
        <input type="text" name="link" id={`${listID}_link`} />
      </label>
      <br />

      <label htmlFor>
        Price
        <input type="text" name="price" id={`${listID}_price`} />
      </label>
      <input type="submit" value="Create" />
    </form>
  </div>
);

Details.propTypes = {
  onChangeNewItem: PropTypes.func,
  onCreateItem: PropTypes.func,
  listID: PropTypes.string,
};

export default Details;
