import React from 'react';

const SignUp = ({ signUp }) => {
  let emailField;
  let passField;
  let firstName;

  return (
    <div className="container">
      <span
        className="bold"
        style={{ paddingTop: '5%', marginLeft: '5vw', marginRight: '5vw', textAlign: 'center' }}
      >
       YOUR ANSWER IS EN ROUTE!
      </span>
      <div className="container_signup">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const submitEmail = emailField.value.trim();
            const submitPass = passField.value.trim();
            const submitName = firstName.value.trim();
            if (submitEmail && submitPass && submitName) {
              signUp(submitEmail, submitPass, submitName);
            }
          }}
          className="form_signup"
        >
          FIRST NAME<br />
          <input type="text" name="firstname" ref={(node) => { firstName = node; }} /><br />
          E-MAIL<br />
          <input type="text" name="lastname" ref={(node) => { emailField = node; }} /><br />
          PASSWORD<br />
          <input type="password" name="password" ref={(node) => { passField = node; }} />
        </form>
      </div>
      <div className="button_container">
        <button className="answer_button"> LETS GO! </button>
      </div>
    </div>
  );
};

export default SignUp;
