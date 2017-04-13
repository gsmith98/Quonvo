import React from 'react';

const SigninBar = ({ signIn }) => {
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
      <input className="emailField" ref={(node) => { emailField = node; }} />
      <input className="passwordField" ref={(node) => { passField = node; }} />
      <button type="submit">Sign In</button>
    </form>

  );
};

export default SigninBar;
