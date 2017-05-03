import React from 'react';
import { signIn } from 'api';
import SigninBar from '../presentationalComponents/SigninBar';


const signInClick = (email, password) => {
  signIn(email, password)
  .then((resp) => {
    if (!resp.success) {
      // success: false, message: message
      // TODO dispatch action -> 'incorrect email or password' (don't be more descriptive)
    } else {
      // success: true, user: mognoUserObject
      location.href = '/'; // this redirects you to '/'
    }
  })
  .catch((err) => {
    // TODO how to handle?
    throw err;
  });
};

const BigQ = () => (

  <div className="display_container">
    <span className="display_font"> Q</span>
    <div className="header_block">
      <span className="explanation"> WELCOME TO </span>
      <span className="explanation2"> Quonvo</span>
      <SigninBar signIn={signInClick} />

    </div>

  </div>


  );

export default BigQ;
