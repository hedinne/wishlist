/* eslint no-undef: "off" */
import React, { Component, PropTypes } from 'react';
import qs from 'qs';
import OpenList from '../../components/OpenList/OpenList.jsx';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';
import s from './OpenListPage.scss';

export default class OpenListPage extends Component {

  constructor(...args) {
    super(...args);
    this.state = ({ list: '' });
  }

  componentDidMount() {
    const getInit = {
      method: 'POST',
      body: qs.stringify({ id: this.props.match.params.id }),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };
    fetch('/openlist', getInit)
      .then(res => res.json())
      .then(res => res.data)
      .then((res) => {
        this.setState({
          list: res,
        });
      });
  }

  render() {
    return (
      <div>
        <Bar>
          <Item to="/login" className={s.item}>Sign In</Item>
          <Item logo />
          <Item to="/register" className={s.item}>Register</Item>
        </Bar>

        <OpenList list={this.state.list} />
      </div>
    );
  }
}

OpenListPage.propTypes = {
  match: PropTypes.object,
};
