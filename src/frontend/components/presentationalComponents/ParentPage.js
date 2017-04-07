import React from 'react';
import { ChatContainer, QuestionBarContainer } from '../containerComponents';
import SideBar from './SideBar';

const ParentPage = ({ chatopen }) => (
  <div className="page_container">
    <QuestionBarContainer />
    {chatopen ? <ChatContainer /> : null}
    <SideBar />
  </div>
);

export default ParentPage;
