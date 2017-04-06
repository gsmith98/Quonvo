import React from 'react';
// messages is an array that has each message content, an id, and whether it's yours
// The message array must have a key called user that is either THEM or YOU
// TODO the colors of the messages should probably be different
// TODO requires container

const MessagesBox = ({ messages }) => (
  <div className="chat_body">
    {messages.map(message =>
      <div key={message.id} className={`chatmessage${message.user}`}>
        <div className="message_text"> {message.content} </div>
      </div>
    )}
  </div>
  );

export default MessagesBox;
