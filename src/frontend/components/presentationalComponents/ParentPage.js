import React from 'react';
import { ChatContainer, QuestionBarContainer, SideBarContainer, TabsBarContainer } from '../containerComponents';

const ParentPage = ({ chats }) => (
  <div className="page_container">
    <QuestionBarContainer />
    <TabsBarContainer chats={chats} />
    {chats.map(chat => (chat.chatRoom ?
      <ChatContainer key={chat.chatIndex} chatIndex={chat.chatIndex} startOpen={chat.chatopen} />
      : null))}
    <SideBarContainer />
  </div>
);

export default ParentPage;
