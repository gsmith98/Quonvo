import React from 'react';
import ReactStars from 'react-stars';
import { Button } from 'react-bootstrap';

const PostChat = ({ onPress, endedByMe, iAmAsker, chattingPartner }) => {
  let rating = 0;

  const endMessage = endedByMe ? `You ended the Quonvo with ${chattingPartner}.` : `${chattingPartner} ended the Quonvo.`;

  if (!iAmAsker) {
    return (
      <div className="post_chat">
        <p className="rate_chat_text">{endMessage}</p>
        <div className="buttons">
          <Button className="rating_button" onClick={() => onPress('OK')} bsSize="large"> OK </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="post_chat">
      <p className="rate_chat_text">{endMessage}</p>
      <p className="rate_chat_text"> How would you rate that Quonvo? </p>
      <ReactStars
        className="star_rating"
        onChange={(nextValue) => {
          rating = nextValue;
        }}
        count={5}
        half={true}
        size={25}
      />
      <p className="rate_chat_text"> Do you want to get another answer? </p>
      <div className="buttons">
        <Button className="rating_button" onClick={() => onPress('No', rating)} bsSize="large"> No </Button>
        <Button className="rating_button" onClick={() => onPress('Yes', rating)} bsSize="large"> Yes </Button>
      </div>
    </div>
  );
};

export default PostChat;
