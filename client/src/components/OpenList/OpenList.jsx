import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';

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
    const id = e.target.id;
    if (this.state.openID === id) {
      this.setState({ openID: '' });
    } else {
      this.setState({ openID: id });
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
                  <MediaQuery query="(max-width: 768px)">
                    {this.state.openID === item._id && (
                      <Details
                        openItem={listItems.filter(i => i._id === this.state.openID)[0]}
                        readOnly
                      />
                    )}
                  </MediaQuery>
                </li>
              ))}
            </ul>

          </div>
          <MediaQuery query="(min-width: 768px)" >
            {this.state.openID && (
              <Details
                openItem={listItems.filter(i => i._id === this.state.openID)[0]}
                readOnly
              />
            )}
          </MediaQuery>
        </div>
      </div>
    );
  }
}

OpenList.propTypes = {
  list: PropTypes.any,
};
