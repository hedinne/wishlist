import React, { PropTypes } from 'react';
import s from './Details.scss';

const Details = ({
  onChangeNewItem,
  onCreateItem,
  listID,
  openItem,
  onRemoveItem,
  readOnly,
}) => (
  <div className={s.host}>
    <form onChange={onChangeNewItem} onSubmit={onCreateItem} className={s.form}>
      <label htmlFor className={s.label}>
        Title
        {openItem
          ? <input className={s.input} type="text" name="title" id={`${listID}_title`} value={openItem.title} readOnly />
          : <input className={s.input} type="text" name="title" id={`${listID}_title`} />
        }
      </label>

      <label htmlFor className={s.label}>
        Link
        {openItem
          ?
            <input className={s('link', 'input')} type="text" name="link" id={`${listID}_link`} value={openItem.link} readOnly />
          : <input className={s.input} type="url" name="link" id={`${listID}_link`} />
        }
      </label>

      <label htmlFor className={s.label}>
        Price
        {openItem
          ? <input className={s.input} type="text" name="price" id={`${listID}_price`} value={openItem.price} readOnly />
          : <input className={s.input} type="text" name="price" id={`${listID}_price`} />
        }
      </label>

      <label htmlFor className={s.label}>
        Description
        {openItem
          ? <textarea className={s.input} type="text" name="description" id={`${listID}_description`} value={openItem.description} readOnly rows="3" />
          : <textarea className={s.input} type="text" name="description" id={`${listID}_description`} rows="3" />
        }
      </label>

      {!openItem && <input type="submit" value="Create" className={s.submit} />}
    </form>
    {openItem && !readOnly &&
      <button onClick={onRemoveItem} className={s('submit', 'delete')} id={`${openItem._id}_${openItem.owner}`}>
        Delete Item
      </button>
    }
  </div>
);

Details.propTypes = {
  onChangeNewItem: PropTypes.func,
  onCreateItem: PropTypes.func,
  listID: PropTypes.string,
  openItem: PropTypes.any,
  onRemoveItem: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default Details;
