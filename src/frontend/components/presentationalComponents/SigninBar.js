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
    <div className="signin_wrapper">
      <input
        className="field"
        ref={(node) => { emailField = node; }}
        placeholder="email"
      />
      <input
        className="field"
        ref={(node) => { passField = node; }}
        placeholder="password"
      />
      <button className="ask_button"> LET&rsquo;S GO</button>
      <br />
      <div className="line" />
      <br />
      <button className="google" type="submit" onClick={googleClick}>
        <img alt="logo" className="logo" src="../assets/google_logo.png" />
        <span className="signin">Sign in with Google</span>
      </button>

      <div className="explanation" style={{ 'font-size': '10px' }}>Already have an account? Log in <a> here </a> </div>
      <br />
    </div>
  );
};

export default SigninBar;
