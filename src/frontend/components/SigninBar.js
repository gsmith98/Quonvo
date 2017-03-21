import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';

const SigninBar = () => {
  let emailField;
  let passField;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const submitEmail = emailField.value.trim();
        const submitPass = passField.value.trim();
        if (submitEmail && submitPass) {
          signIn(submitEmail, submitPass);
        }
      }}
    >
      <div className="signIn">
        <input placeholder="E-mail" style={{ flex: 1, marginRight: '1vw' }} ref={(node) => { emailField = node; }} />
        <input placeholder="Password" type="password" style={{ flex: 1, marginRight: '1vw' }} ref={(node) => { passField = node; }} />
        <button style={{ flex: 1, marginTop: '0.75vh', height: '2.5em' }} className="answer_button" type="submit">Sign In</button>
      </div>
    </form>

  );
};

export default connect(null, { signIn })(SigninBar); // TODO wrap in withRouter?
