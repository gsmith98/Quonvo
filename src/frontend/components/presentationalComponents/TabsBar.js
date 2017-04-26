import React from 'react';

/* TODO make look good */

const TabsBar = ({ chats, openChat }) => (
  <div>
    {chats.map(chat => (
      <div>
        <button
          key={chat.chatIndex}
          onClick={() => openChat(chat.chatIndex)}
        >
          {chat.chattingPartner}
        </button>
      </div>
    ))}
  </div>
);

export default TabsBar;
