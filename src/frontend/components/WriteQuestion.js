import React from 'react';
// import { connect } from 'react-redux';

// WriteQuestion will be used in a few places, with different functionality
// when submit is clicked depending on the situation. Thus, we are writing
// it as a purely presentational component, and whatever renders it will be
// responsible for passing the onClick function in as a property
const WriteQuestion = ({ onSubmitQuestion }) => {
  let contentField;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const submitContent = contentField.value.trim();
        if (submitContent) {
          onSubmitQuestion(submitContent);
        }
      }}
    >
      <textarea ref={(node) => { contentField = node; }} />
      <button type="submit">GET AN ANSWER</button>
    </form>

  );
};

export default WriteQuestion;
