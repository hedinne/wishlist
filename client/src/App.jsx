/* eslint no-undef: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'es6-promise';
import 'isomorphic-fetch';
import Routing from './Routing.jsx';


ReactDOM.render(<Routing />, document.getElementById('app'));
