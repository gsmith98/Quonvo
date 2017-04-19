import React from 'react';
// import { connect } from 'react-redux';

// WriteQuestion will be used in a few places, with different functionality
// when submit is clicked depending on the situation. Thus, we are writing
// it as a purely presentational component, and whatever renders it will be
// responsible for passing the onClick function in as a property
const WriteQuestion = ({ onSubmitQuestion, afterSubmit }) => {
  let contentField;
  let genre = 'Tech';

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const content = contentField.value.trim();
        // console.dir(event);
        if (content) {
          onSubmitQuestion(content, genre);
          console.log(afterSubmit);
          if (afterSubmit) afterSubmit();
        }
      }}
    >
      <div className="container">
        <textarea
          className="question" ref={(node) => { contentField = node; }}
          placeholder="Enter text here ..."
        />
        <div className="genre">
          <span className="genre_bold"> SUBJECT: </span>
          <select
            defaultValue="Travel"
            onChange={(x) => { genre = x.target.value; }} className="searchbar"
          >
            <option value="Travel">Travel</option>
            <option value="Stuff">Stuff</option>
          </select>
        </div>
        <div className="button_container">
          <button className="answer_button" type="submit"> GET AN ANSWER </button>
        </div>
      </div>

    </form>

  );
};

export default WriteQuestion;
