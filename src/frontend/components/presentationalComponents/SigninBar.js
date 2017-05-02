import React from 'react';

const SigninBar = ({ signIn }) => {
  let emailField;
  let passField;

  const signInClick = () => {
    const submitEmail = emailField.value.trim();
    const submitPass = passField.value.trim();
    if (submitEmail && submitPass) {
      signIn(submitEmail, submitPass);
    }
  };
  const signUpClick = () => {
    // TODO write signup click function
  };

  const googleClick = () => {
    // TODO write google click funciton
  };

  return (
    <div>
      <input
        className="emailField"
        ref={(node) => { emailField = node; }}
        placeholder="email"
      />
      <input
        className="passwordField"
        ref={(node) => { passField = node; }}
        placeholder="password"
      />
      <button type="submit" onClick={signInClick}>Sign In</button>
      <button type="submit" onClick={signUpClick}>Sign up</button>
      <button type="submit" onClick={googleClick}>Sign in with Google</button>
    </div>
  );
};

export default SigninBar;
