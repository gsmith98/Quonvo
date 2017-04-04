import React from 'react';
// import { connect } from 'react-redux';

// WriteQuestion will be used in a few places, with different functionality
// when submit is clicked depending on the situation. Thus, we are writing
// it as a purely presentational component, and whatever renders it will be
// responsible for passing the onClick function in as a property
const WriteQuestion = ({ onSubmitQuestion }) => {
  let contentField;
  let genre = 'Tech';

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const submitContent = contentField.value.trim();
        // console.dir(event);
        if (submitContent) {
          onSubmitQuestion(submitContent, genre);
        }
      }}
    >

      <div className="container">
        <textarea
          className="question" ref={(node) => { contentField = node; }}
          placeholder="Enter text here ..."
        />
        <div className="genre">
          <span className="genre_bold"> GENRE: </span>
          <select
            defaultValue="Tech"
            onChange={(x) => { genre = x.target.value; }} className="searchbar"
          >
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Advice">Advice</option>
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