import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
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
      <StarRatingComponent
        className="star_rating"
        name="rating"
        onStarClick={(nextValue) => {
          rating = nextValue;
        }}
        starCount={5}
        value={rating}
        size={1000}
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
