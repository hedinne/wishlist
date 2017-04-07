import React, { PropTypes } from 'react';
import s from './Details.scss';

const Details = ({
  onChangeNewItem,
  onCreateItem,
  listID,
  openItem,
}) => (
  <div className={s.host}>
    <form onChange={onChangeNewItem} onSubmit={onCreateItem}>
      <label htmlFor>
        Title
        {openItem
          ? <input className={s.input} type="text" name="title" id={`${listID}_title`} value={openItem.title} readOnly />
          : <input className={s.input} type="text" name="title" id={`${listID}_title`} />
        }
      </label>
      <br />
      <label htmlFor>
        Description
        {openItem
          ? <input className={s.input} type="text" name="description" id={`${listID}_description`} value={openItem.description} readOnly />
          : <input className={s.input} type="text" name="description" id={`${listID}_description`} />
        }
      </label>
      <br />

      <label htmlFor>
        Link
        {openItem
          ? <input className={s.input} type="text" name="link" id={`${listID}_link`} value={openItem.link} readOnly />
          : <input className={s.input} type="text" name="link" id={`${listID}_link`} />
        }
      </label>
      <br />

      <label htmlFor>
        Price
        {openItem
          ? <input className={s.input} type="text" name="price" id={`${listID}_price`} value={openItem.price} readOnly />
          : <input className={s.input} type="text" name="price" id={`${listID}_price`} />
        }
      </label>
      <br />
      {!openItem && <input type="submit" value="Create" />}
    </form>
  </div>
);

Details.propTypes = {
  onChangeNewItem: PropTypes.func,
  onCreateItem: PropTypes.func,
  listID: PropTypes.string,
  openItem: PropTypes.any,
};

export default Details;
