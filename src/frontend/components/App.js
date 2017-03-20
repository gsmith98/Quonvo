import React from 'react';

const App = ({ match }) => (
  <p>Currrently on: {match.params.subroute || 'Home'}</p>
);

export default App;
