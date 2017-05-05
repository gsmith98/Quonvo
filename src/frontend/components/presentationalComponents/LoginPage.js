import React from 'react';
import { signIn } from 'api';
// NOTE at moment (4/26/17) the login app cannot import using the index.js files since they
// cause import of everything, including containers that error without their presentationals
// TODO investigate this and fix imports (both for js and css)
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

const LoginPage = () => (

  <div className="display_container">
    <span className="display_font"> Q</span>
    <div className="header_block">
      <span className="explanation"> WELCOME TO </span>
      <span className="explanation2"> Quonvo</span>
      <SigninBar signIn={signInClick} />

    </div>

  </div>


  );


export default LoginPage;
