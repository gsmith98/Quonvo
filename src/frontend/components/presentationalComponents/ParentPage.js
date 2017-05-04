import React from 'react';
import { ChatContainer, QuestionBarContainer, SideBarContainer, TabsBarContainer, ArchivesContainer, RankingsContainer } from '../containerComponents';

const ParentPage = ({ chats, archives, rankings }) => (
  <div className="page_container">
    <QuestionBarContainer />
    <div className="center">
      <TabsBarContainer chats={chats} />
      {chats.map(chat => (chat.chatRoom ?
        <ChatContainer key={chat.chatIndex} chatIndex={chat.chatIndex} /> : null))}
      {archives ? <ArchivesContainer /> : null}
      {rankings ? <RankingsContainer /> : null}
    </div>
    <SideBarContainer />
  </div>
);

export default ParentPage;
