import React from 'react';
import { signIn } from 'api';
// NOTE at moment (4/26/17) the login app cannot import using the index.js files since they
// cause import of everything, including containers that error without their presentationals
// TODO investigate this and fix imports (both for js and css)
import BigQ from '../presentationalComponents/BigQ';
import SigninBar from '../presentationalComponents/SigninBar';
import WriteQuestion from '../presentationalComponents/WriteQuestion';


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

// TODO make look good
const LoginPage = () => (
  <div>
    <BigQ />
    <WriteQuestion onSubmitQuestion={null} afterSubmit={null} /> {/* TODO fill in null props */}
    <SigninBar signIn={signInClick} />
  </div>
);

export default LoginPage;
