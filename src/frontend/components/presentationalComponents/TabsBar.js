import React from 'react';

/* TODO make look good */

const TabsBar = ({ chats, openChat }) => (
  <div className="tabs_bar">
    {chats.map(chat => (
      chat.chattingPartner ?
        <div
          key={chat.chatIndex}
          className="tab"
          onClick={() => openChat(chat.chatIndex)}
        >
          <span className="chatting_partner bold">
            {`${chat.unreadMessages} ${chat.chattingPartner}`}
          </span>
        </div>
        : null
    ))}
  </div>
);

export default TabsBar;
