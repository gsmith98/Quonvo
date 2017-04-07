import React from 'react';
import { ChatContainer, QuestionBarContainer } from '../containerComponents';

const ParentPage = ({ chatopen }) => (
  <div>
    <QuestionBarContainer />
    {chatopen ? <ChatContainer /> : null}
  </div>
);

export default ParentPage;
