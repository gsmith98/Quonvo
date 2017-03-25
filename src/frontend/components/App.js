import React from 'react';
import DevPostman from './devComponents';

const App = ({ match }) => (
  <div>
    <p>Currrently on: {match.params.subroute || 'Home'}</p>
    <DevPostman url="http://localhost:3000" />
  </div>
);

export default App;
