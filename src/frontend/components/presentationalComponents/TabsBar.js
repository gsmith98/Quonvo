import React from 'react';

/* TODO make look good */

const TabsBar = ({ chats, openChat }) => (
  <div>
    {chats.map(chat => (
      chat.chattingPartner ?
        <div key={chat.chatIndex}>
          <button onClick={() => openChat(chat.chatIndex)}>
            {chat.chattingPartner}
          </button>
        </div>
        : null
    ))}
  </div>
);

export default TabsBar;
