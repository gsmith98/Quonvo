import React from 'react';
// NOTE at moment (4/26/17) the login app cannot import using the index.js files since they
// cause import of everything, including containers that error without their presentationals
// TODO investigate this and fix imports (both for js and css)
import BigQ from '../presentationalComponents/BigQ';

// TODO make look good
const LoginPage = () => (
  <div>
    <BigQ />
  </div>
);

export default LoginPage;
