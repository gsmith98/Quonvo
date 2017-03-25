import React from 'react';
import SocketTool from './SocketTool';

const App = ({ match }) => (
  <div>
    <p>Currrently on: {match.params.subroute || 'Home'}</p>
    <SocketTool />
  </div>
);

export default App;
