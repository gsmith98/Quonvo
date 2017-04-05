import React from 'react';

const BigQ = ({ onPressButton }) => (

  <div className="display_container">
    <span className="display_font"> Q</span>
    <div className="header_block">
      <div className="spacer" />
      <div className="header"> Ask me anything. </div>
      <div className="explanation">
      Quonvo lets real humans answer your questions.
      After all, we learn our best life lessons from people, not Google searches. </div>
      <div className="button_ask_container">
        <button className="ask_button" onClick={onPressButton}> GET AN ANSWER </button>
      </div>
    </div>

  </div>


  );

export default BigQ;
