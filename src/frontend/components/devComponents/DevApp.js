import React from 'react';
import { DevPostman } from '../devComponents';
import * as Components from '../index';

// Any component written as a function can be rendered by
// webdevserver (npm run frontendDev) @ localhost:8080/ComponentName
// with no ComponentName supplied you get the devtool for postman/sockets
// TODO allow prop or state passing using url's querystring
const DevApp = ({ match /* , location */ }) => ( // location.search is where querystring ends up
  <div>
    {match.params.subroute ? Components[match.params.subroute]({}) : <DevPostman url={DOMAIN} />}
  </div>
);

export default DevApp;
