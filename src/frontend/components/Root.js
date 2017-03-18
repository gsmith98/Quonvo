import React, { PropTypes } from 'react';
// import { Provider } from 'react-redux';
// import { Router, Route, browserHistory } from 'react-router';
// import App from './App';

const Root = (/* { store } */) => (
  <p>We have liftoff! {'JSX may work!'}</p>
  /* <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>*/
);


Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
