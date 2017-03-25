import React from 'react';
import SocketTool from './SocketTool';
import PostTool from './PostTool';

// props has only one property, url
const DevPostman = props => (
  <div>
    <p>Target server: {props.url}</p>
    <PostTool {...props} />
    <SocketTool {...props} />
  </div>
);

export default DevPostman;
