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
      <input ref={(node) => { emailField = node; }} />
      <input ref={(node) => { passField = node; }} />
      <button type="submit">Sign In</button>
    </form>

  );
};

export default connect(null, { signIn })(SigninBar); // TODO wrap in withRouter?
