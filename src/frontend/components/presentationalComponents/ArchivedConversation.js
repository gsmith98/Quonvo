import React from 'react';
// Change the class names to their own class names later on
const ArchivedConversation = ({ messages, backToArchives }) => (
  <div className="archive_body">
    <div className="previous_archives back_to_archives" onClick={() => backToArchives()}>
      <img className="arrow_icon" alt="" src="assets/left-arrow.svg" />
    </div>
    {messages.map(message =>
      <div key={message.id} className={`chatmessage${message.user}`}>
        <div className="message_text"> {message.content} </div>
      </div>
    )}
  </div>
);
export default ArchivedConversation;
