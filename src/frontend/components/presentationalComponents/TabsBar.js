import React from 'react';


const TabsBar = ({ chats, openChat }) => (
  <div className="tabs_bar">
    {chats.map(chat => (
      chat.chattingPartner ?
        <div
          key={chat.chatIndex}
          className="tab"
          onClick={() => openChat(chat.chatIndex)}
        >
          { (chat.unreadMessages) ? <div className="notification">
            <div className="notification_number">
              {chat.unreadMessages}
            </div>
          </div> : <div className="notification">
            <div className="notification_number" style={{ backgroundColor: '#ededed' }} />
          </div> }
          <div className="chatting_partner bold">
            {`${chat.chattingPartner}`}
          </div>
        </div>
        : null
    ))}
  </div>
);

export default TabsBar;
