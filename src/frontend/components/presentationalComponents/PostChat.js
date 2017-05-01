import React from 'react';
import ReactStars from 'react-stars';
import { Button } from 'react-bootstrap';

const PostChat = ({ submitRating, closeModal }) => {
  let rating = 0;
  console.log(rating);

  const onPress = (questionAnswered) => {
    closeModal();
    submitRating(rating, questionAnswered);
  };

  return (
    <div className="post_chat">
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
        <Button className="rating_button" onClick={() => onPress('No')} bsSize="large"> No </Button>
        <Button className="rating_button" onClick={() => onPress('Yes')} bsSize="large"> Yes </Button>
      </div>
    </div>
  );
};

export default PostChat;
