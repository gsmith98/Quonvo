import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

require('./css'); // eslint-disable-line import/no-unresolved


const store = configureStore();
render(
  <Root store={store} />,
  document.getElementById('root')
);
