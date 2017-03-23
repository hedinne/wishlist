import React, { PropTypes, Component } from 'react';
import Details from '../Details/Details.jsx';
import s from './List.scss';


export default class List extends Component {

  render() {

    const {
      list,
      onCreateItem,
      onRemoveItem,
      onRemoveList,
      itemSelected,
      listClosed,
      openItem,
      onChangeNewItem,
    } = this.props;

    const hostClasses = s('host', { isOpen: openItem.owner === list._id });

    return (
      <div className={hostClasses}>
        <div className={s.headingContainer}>
          <h4 className={s.title}>
            {list.title}
            <span className={s.button}>
              <button onClick={onRemoveList} name={list._id}> X</button>
            </span>
          </h4>
          <div className={s.buttonContainer} >
            <button>+</button>
            <button onClick={listClosed}>X</button>
          </div>
        </div>
        <hr className={s.line} />


        <div className={s.container}>
          <ul className={s.ul}>
            {list.listItems &&
              list.listItems.map(item => (
                <li key={item._id} className={s.li}>
                  <button
                    onClick={itemSelected.bind(this, item)} // eslint-disable-line
                  >
                    {item.title}
                  </button>
                  <span className={s.button}>
                    <button onClick={onRemoveItem} name={`${item._id}_${list._id}`}>
                      X
                    </button>
                  </span>
                </li>
              ))
            }
          </ul>

          {openItem.owner === list._id && (
            <Details
              onChangeNewItem={onChangeNewItem}
              onCreateItem={onCreateItem}
              listID={list._id}
            />
          )}

        </div>
      </div>
    );
  }
}


List.propTypes = {
  list: PropTypes.any,
  onCreateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onRemoveList: PropTypes.func,
  itemSelected: PropTypes.func,
  listClosed: PropTypes.func,
  onChangeNewItem: PropTypes.func,
  openItem: PropTypes.any,
};
