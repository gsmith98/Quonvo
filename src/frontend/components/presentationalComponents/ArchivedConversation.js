import React from 'react';
// Change the class names to their own class names later on
const ArchivedConversation = ({ messages, backToArchives }) => (
    <div className="chat_body">
      <div onClick={() => backToArchives()}>GO BACK</div>
      {messages.map(message =>
        <div key={message.id} className={`chatmessage${message.user}`}>
          <div className="message_text"> {message.content} </div>
        </div>
      )}
    </div>
);
export default ArchivedConversation;
