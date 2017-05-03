import React from 'react';
import { ChatContainer, QuestionBarContainer, SideBarContainer, TabsBarContainer, ArchivesContainer } from '../containerComponents';

const ParentPage = ({ chats, archives }) => (
  <div className="page_container">
    <QuestionBarContainer />
    <div className="center">
      <TabsBarContainer chats={chats} />
      {chats.map(chat => (chat.chatRoom ?
        <ChatContainer key={chat.chatIndex} chatIndex={chat.chatIndex} /> : null))}
      {archives ? <ArchivesContainer /> : null}
    </div>
    <SideBarContainer />
  </div>
);

export default ParentPage;
