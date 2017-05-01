import React from 'react';
import { Provider } from 'react-redux';
import { Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DevApp from './DevApp';

const AppComponent = process.env.NODE_ENV === 'development' ? DevApp : App;

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <div>
        <Route exact={true} path="/" component={AppComponent} />
        <Route path="/:subroute" component={AppComponent} />
      </div>
    </BrowserRouter>
  </Provider>
);

export default Root;
