import React from 'react';
import { signIn } from 'api';
// NOTE at moment (4/26/17) the login app cannot import using the index.js files since they
// cause import of everything, including containers that error without their presentationals
import BigQ from './presentationalComponents/BigQ';
import SigninBar from './presentationalComponents/SigninBar';
import WriteQuestion from './presentationalComponents/WriteQuestion';

// TODO make look good
const LoginPage = () => (
  <div>
    <BigQ />
    <WriteQuestion onSubmitQuestion={null} afterSubmit={null} /> {/* TODO fill in null props */}
    <SigninBar signIn={signIn} />
  </div>
);

export default LoginPage;
