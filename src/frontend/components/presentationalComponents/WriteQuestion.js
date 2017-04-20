import React from 'react';

const topics = ['Travel', 'Stuff']; // TODO  pull from same place as model enum?
const defaultHandle = 'Anonymous';

// WriteQuestion will be used in a few places, with different functionality
// when submit is clicked depending on the situation. Thus, we are writing
// it as a purely presentational component, and whatever renders it will be
// responsible for passing the onClick function in as a property
const WriteQuestion = ({ onSubmitQuestion, afterSubmit }) => {
  let contentField;
  let genre = topics[0];
  let handleField;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const content = contentField.value.trim();
        const handle = handleField.value.trim() || defaultHandle;

        if (content) {
          onSubmitQuestion(genre, content, handle);
          if (afterSubmit) afterSubmit();
        }
      }}
    >
      <div className="container">
        <textarea
          className="question"
          ref={(node) => { contentField = node; }}
          placeholder="Enter text here ..."
        />
        <span>Handle</span>
        <input type="text" placeholder={defaultHandle} ref={(node) => { handleField = node; }} />
        <div className="genre">
          <span className="genre_bold"> SUBJECT: </span>
          <select
            className="searchbar"
            defaultValue={topics[0]}
            onChange={(x) => { genre = x.target.value; }}
          >
            {topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
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
