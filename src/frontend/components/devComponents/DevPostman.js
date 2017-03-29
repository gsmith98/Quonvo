import React from 'react';
import SocketTool from './SocketTool';
import PostTool from './PostTool';
import GetTool from './GetTool';
import Switcher from './Switcher';

// props has only one property, url
const DevPostman = props => (
  <div>
    <p>Target server: {props.url}</p>
    <Switcher names={['POST', 'GET']}>
      <PostTool {...props} />
      <GetTool {...props} />
    </Switcher>
    <SocketTool {...props} />
  </div>
);

export default DevPostman;
