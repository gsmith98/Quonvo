import 'babel-polyfill';
import 'styles';
import React from 'react';
import { render } from 'react-dom';
import LoginPage from './components/LoginPage';

render(
  <LoginPage />,
  document.getElementById('root')
);
