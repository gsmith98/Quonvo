import { signIn as apiSignIn } from 'api';
// thunk
export const signIn = (email, password) => (/* dispatch */) => {
  apiSignIn(email, password)
  .then((responseJson) => {
    console.log('responseJson', responseJson);

    // TODO dispatch something to my state saying I'm logged in?
    // TODO otherwise remove from actions and possibly remove SigninBarContainer
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};
