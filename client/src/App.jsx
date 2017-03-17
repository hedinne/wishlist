/* eslint no-undef: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing.jsx';

require('es6-promise').polyfill();
require('isomorphic-fetch');

ReactDOM.render(
  <Routing />,
  document.getElementById('app'),
);
