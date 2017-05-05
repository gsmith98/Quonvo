import React from 'react';
import { MessagesBoxContainer } from '../containerComponents';

const Chat = ({
  sendMessage,
  chattingPartner,
  chatIndex,
  endChatClick,
  minimizeChat
}) => {
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
      <div className="wrapper">
        <div onClick={() => minimizeChat(chatIndex)} className="chat_left_arrow">
          <img alt="" src="assets/left-arrow.svg" className="icon" />
        </div>
        <div className="chat_top">
          <img
            alt=""
            className="chatprofiler"
            src="assets/chat_profile_icon-01.png"
            onClick={() => minimizeChat(chatIndex)} // TODO make deicated minimize button
          />
          <div className="chat_intro bold">
              CONVERSATION WITH {chattingPartner}
          </div>
        </div>
      </div>
      <MessagesBoxContainer chatIndex={chatIndex} />
      <div className="wrapper3">
        <div className="respond_body">
          <textarea
            onKeyPress={(e) => { if (e.key === 'Enter') { clickSend(); e.preventDefault(); } }}
            className="chat_response_body"
            placeholder="Respond here..."
            name="comment"
            ref={(node) => { textArea = node; }}
          />
          <div className="send_message" onClick={() => clickSend()}>
            <div className="message_text">Send</div>
          </div>
          <div className="send_message" onClick={() => endChatClick()}>
            <div className="message_text">End</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Chat;
