import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Dashboard.scss';
import List from '../List/List.jsx';

export default class Dashboard extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      openItem: {},
    };

    this.itemSelected = this.itemSelected.bind(this);
    this.listClosed = this.listClosed.bind(this);
    this.onClickAddNew = this.onClickAddNew.bind(this);
  }

  onClickAddNew(ownerID) {
    if (this.state.openItem._id !== 'new') {
      this.setState({
        openItem: {
          _id: 'new',
          owner: ownerID,
        },
      });
    }
  }

  itemSelected(openItem) {
    this.setState({ openItem: {} });
    if (openItem === this.state.openItem) {
      this.setState({ openItem: {} });
    } else {
      this.setState({ openItem });
    }
  }

  listClosed() {
    if (this.state.openItem) {
      this.setState({ openItem: {} });
    }
  }

  render() {
    const { allLists, onCreateItem, onRemoveItem, onRemoveList, onChangeNewItem } = this.props;

    const openList = allLists.find(list => list._id === this.state.openItem.owner);

    return (
      <div className={s.host}>

        {!!this.state.openItem._id && openList
          ?
            <List
              key={openList._id}
              list={openList}
              onCreateItem={onCreateItem}
              onRemoveItem={onRemoveItem}
              onRemoveList={onRemoveList}
              itemSelected={this.itemSelected}
              listClosed={this.listClosed}
              openItem={this.state.openItem}
              onChangeNewItem={onChangeNewItem}
              onClickAddNew={this.onClickAddNew}
              isNew={this.state.openItem._id === 'new'}
            />
          :
            allLists &&
              allLists.map(item => (
                <List
                  key={item._id}
                  list={item}
                  onCreateItem={onCreateItem}
                  onRemoveItem={onRemoveItem}
                  onRemoveList={onRemoveList}
                  itemSelected={this.itemSelected}
                  listClosed={this.listClosed}
                  openItem={
                    typeof this.state.openItem._id !== 'undefined' &&
                      this.state.openItem.owner === item._id &&
                      this.state.openItem
                  }
                  onChangeNewItem={onChangeNewItem}
                  onClickAddNew={this.onClickAddNew}
                  isNew={this.state.openItem._id === 'new'}
                />
              ),
            )
          }
      </div>
    );
  }
}

Dashboard.propTypes = {
  allLists: PropTypes.any,
  onCreateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onRemoveList: PropTypes.func,
  onChangeNewItem: PropTypes.func,
};
