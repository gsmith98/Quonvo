import React from 'react';
import MessagesContainer from '../containerComponents/MessagesContainer';
// Use the MessageContainer
const Chat = (sendMessage, chattingPartner) => (
  <div className="chat_part">
    <div className="chat_box_full">
      <img alt="" className="chatprofiler" src="./assets/chat_profile_icon-01.png" />
      <div className="chat_top">
        <div
          className="chat_intro bold"
          style={{ fontSize: '24px', padding: '4vh 0vh 0vh 5vh' }}
        >
          CONVERSATION WITH {chattingPartner}
        </div>
        <br />
      </div>
      <hr size="2px" width="95%" color="black" />
      <MessagesContainer /> { // TODO make this container
      }
      <hr size="2px" width="90%" color="black" />
      <div className="respond_body">
        <textarea
          className="chat_response_body"
          placeholder="Respond here..." name="comment" style={{ marginLeft: '3vw',
            marginRight: '6%' }}
        />
        <button className="send_message" onClick={sendMessage()} />
      </div>

    </div>
  </div>
);

export default Chat;
