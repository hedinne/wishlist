/* eslint no-undef: "off", max-len: "off" */
import React, { Component } from 'react';
import qs from 'qs';
import Auth from '../../modules/Auth';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';
import s from './DashboardPage.scss';

function postInit(payload) {
  return {
    method: 'POST',
    body: qs.stringify(payload),
    headers: new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${Auth.getToken()}`,
    }),
  };
}

async function fetchFromServer(url, init) {
  const response = await fetch(url, init);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.statusText);
  }

  return body.data;
}


export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allLists: [],
      showNewList: false,
      newItem: {
        title: '',
        description: '',
        link: '',
        price: '',
        owner: '',
      },
    };

    this.onCreateList = this.onCreateList.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onRemoveList = this.onRemoveList.bind(this);
    this.onChangeNewItem = this.onChangeNewItem.bind(this);
    this.onClickShowNewList = this.onClickShowNewList.bind(this);
  }

  componentDidMount() {
    const getInit = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };

    fetchFromServer('/api/dashboard', getInit)
      .then(res =>
        this.setState({
          allLists: res,
        }),
      )
      .catch(err => console.error('💩', err));
  }

  onCreateItem(e) {
    e.preventDefault();
    if (!this.state.newItem.title) { return; }

    fetchFromServer('/api/create/item', postInit(this.state.newItem))
    .then((res) => {
      this.setState({
        allLists: res,
        newItem: {},
      });
    })
    .catch(err => console.error('💩', err));

    e.target.reset();
  }

  onCreateList(e) {
    e.preventDefault();

    const title = e.target.newName.value;
    if (!title) { return; }

    fetchFromServer('/api/create/list', postInit({ title }))
      .then(res => this.setState({ allLists: res }))
      .catch(err => console.error('💩', err));
  }

  onRemoveItem(e) {
    e.preventDefault();

    const itemID = e.currentTarget.id.split('_')[0];
    const listID = e.currentTarget.id.split('_')[1];

    const newList = this.state.allLists;
    newList
      .find(i => i._id === listID)
      .listItems.splice(
        newList
          .find(i => i._id === listID)
          .listItems.indexOf(
            newList.find(i => i._id === listID).listItems.find(i => i._id === itemID),
          ),
        1,
      );

    this.setState({ allLists: newList });

    fetchFromServer('api/remove/item', postInit({ item: itemID }))
      .then((res) => { this.setState({ allLists: res }); })
      .catch(err => console.error('💩', err));
  }

  onRemoveList(e) {
    e.preventDefault();

    const listID = e.currentTarget.id.split('_')[1];

    const newList = this.state.allLists;
    newList.splice(newList.indexOf(newList.find(i => i._id === listID)), 1);
    this.setState({ allLists: newList });

    fetchFromServer('api/remove/list', postInit({ item: listID }))
      .then((res) => { this.setState({ allLists: res }); })
      .catch(err => console.error('💩', err));
  }

  onChangeNewItem(e) {
    e.preventDefault();

    const target = e.target;
    const newItem = this.state.newItem;
    newItem[target.name] = target.value;
    newItem.owner = target.id.split('_')[0];

    this.setState({ newItem });
  }

  onClickShowNewList() {
    this.setState({
      showNewList: !this.state.showNewList,
    });
  }

  render() {
    return (
      <div className={s.host}>
        <Bar className={s.bar}>
          <Item to="/logout" className={s.headerItem}>Log Out</Item>
          <Item logo className={s.logo} />
          <Item className={s.headerItem}>
            <button
              className={s('newListButton', { 'newListButton--open': this.state.showNewList })}
              onClick={this.onClickShowNewList}
            >
              <label htmlFor="newName">
                New List
              </label>
            </button>
            {this.state.showNewList &&
              <form action="/" onSubmit={this.onCreateList} className={s.form}>
                <input
                  type="text"
                  name="newName"
                  id="newName"
                  className={s.input}
                  autoComplete="off"
                />
                <button type="submit" className={s.inputButton}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ddd"
                      d="M12 2q0.414 0 0.707 0.293t0.293 0.707v8h8q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-8v8q0 0.414-0.293 0.707t-0.707 0.293-0.707-0.293-0.293-0.707v-8h-8q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293h8v-8q0-0.414 0.293-0.707t0.707-0.293z"
                    />
                  </svg>
                </button>
              </form>}
          </Item>
        </Bar>

        <Dashboard
          allLists={this.state.allLists}
          onCreateItem={this.onCreateItem}
          onRemoveItem={this.onRemoveItem}
          onRemoveList={this.onRemoveList}
          onChangeNewItem={this.onChangeNewItem}
        />
      </div>
    );
  }
}
