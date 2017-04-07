import React, { Component, PropTypes } from 'react';
import s from './OpenList.scss';
import Details from '../Details/Details.jsx';


export default class OpenList extends Component {

  constructor(...args) {
    super(...args);

    this.state = { openID: '' };
    this.openItem = this.openItem.bind(this);
  }

  openItem(e) {
    e.preventDefault();
    const openID = this.target.id;
    if (this.state.openID === openID) {
      this.setState({ openID: '' });
    } else {
      this.setState({ openID });
    }
  }

  render() {
    const {
      title,
      listItems,
    } = this.props.list;

    return (
      <div className={s.host}>
        <h2>{title}</h2>
        <div className={s.content}>
          <div className={s.list}>
            <ul className={s.ul}>
              {listItems && listItems.map(item => (
                <li key={item._id} className={s.li}>
                  <button id={item._id} className={s.item} onClick={this.openItem}>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>

          </div>
          {this.state.open && (
            <Details openItem={listItems.filter(i => i._id === this.state.open)[0]} />
          )}
        </div>
      </div>
    );
  }
}

OpenList.propTypes = {
  list: PropTypes.any,
};
