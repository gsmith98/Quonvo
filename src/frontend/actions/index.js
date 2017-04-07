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

export const openChat = () => ({ type: 'OPEN_CHAT' });
export const closeChat = () => ({ type: 'CLOSE_CHAT' });
export const newChattingPatner = partner => ({ type: 'NEW_PARTNER', partner });
export const joinRoom = room => ({ type: 'JOIN_ROOM', room });

export const onQuestionClick = questionId => (dispatch) => {
  dispatch(joinRoom(questionId));
  dispatch(newChattingPatner(questionId)); // TODO get actual chattingPartner handle
  dispatch(openChat());
};
