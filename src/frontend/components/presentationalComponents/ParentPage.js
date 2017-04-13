import React from 'react';
import { ChatContainer, QuestionBarContainer } from '../containerComponents';
import SideBar from './SideBar';

const ParentPage = ({ chats }) => (
  <div className="page_container">
    <QuestionBarContainer />
    {chats.map(chat =>
      (chat.chatopen ? <ChatContainer key={chat.chatIndex} chatIndex={chat.chatIndex} /> : null))}
    <SideBar />
  </div>
);

export default ParentPage;
