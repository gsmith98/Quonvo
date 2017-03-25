import React from 'react';
import SocketTool from './SocketTool';
import PostTool from './PostTool';

const DevPostman = ({ url }) => {
  return (
    <div>
      <PostTool url={url} />
      <SocketTool url={url} />
    </div>
  );
};

export default DevPostman;
