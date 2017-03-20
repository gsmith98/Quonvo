import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/:subroute" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
);

/* eslint react/forbid-prop-types: 0 */
Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
