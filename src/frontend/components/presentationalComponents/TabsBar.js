import React from 'react';

/* TODO make look good */
// chat.unreadMessages
const TabsBar = ({ chats, openChat }) => (
  <div className="tabs_bar">
    {chats.map(chat => (
      chat.chattingPartner ?
        <div
          key={chat.chatIndex}
          className="tab"
          onClick={() => openChat(chat.chatIndex)}
        >
          <div className="notification">
            <div className="notification_number">
              {chat.unreadMessages}
            </div>
          </div>
          <div className="chatting_partner bold">
            {`${chat.chattingPartner}`}
          </div>
        </div>
        : null
    ))}
  </div>
);

export default TabsBar;
