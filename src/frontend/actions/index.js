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

// TODO make a thunk that hits API and uses id from response
// or make it take an id and let whoever calls it do the saving
let nextid = 0;
const newMessage = (content, user) => ({
  type: 'NEW_MESSAGE',
  message: {
    content,
    user,
    id: nextid++
  }
});

export const sendMessage = content => newMessage(content, 'YOU');
export const receiveMessage = content => newMessage(content, 'THEM');
