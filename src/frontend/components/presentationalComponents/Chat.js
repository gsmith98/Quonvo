import React from 'react';
import { MessagesBoxContainer } from '../containerComponents';

const Chat = ({ sendMessage, chattingPartner }) => {
  let textArea;
  const clickSend = () => {
    const msgToSend = textArea.value.trim();
    if (msgToSend) {
      sendMessage(msgToSend);
    }
    textArea.value = '';
  };

  return (
    <div className="chat_part">
      <div className="chat_box_full">
        <div className="wrapper">
          <div className="chat_top">
            <img alt="" className="chatprofiler" src="assets/chat_profile_icon-01.png" />
            <div className="chat_intro bold">
                CONVERSATION WITH {chattingPartner}
            </div>
          </div>
        </div>
        <MessagesBoxContainer />
        <div className="wrapper3">
          <div className="respond_body">
            <textarea
              onKeyPress={(e) => { if (e.key === 'Enter') clickSend(); }}
              className="chat_response_body"
              placeholder="Respond here..."
              name="comment"
              ref={(node) => { textArea = node; }}
            />
            <div className="send_message" onClick={() => clickSend()}>
              <div className="message_text">Send message </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Chat;
