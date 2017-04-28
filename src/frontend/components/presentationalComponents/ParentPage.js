import React from 'react';
import { ChatContainer, QuestionBarContainer, SideBarContainer, TabsBarContainer, ArchivesContainer } from '../containerComponents';

const ParentPage = ({ chats, archives }) => (
  <div className="page_container">
    <QuestionBarContainer />
    <TabsBarContainer chats={chats} />
    {chats.map(chat => (chat.chatRoom ?
      <ChatContainer key={chat.chatIndex} chatIndex={chat.chatIndex} startOpen={chat.chatopen} />
      : null))}
    {archives ? <ArchivesContainer /> : null}
    <SideBarContainer />
  </div>
);

export default ParentPage;
