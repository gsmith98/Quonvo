import {
   signIn as apiSignIn,
   sendMessage as apiSendMessage,
   createQuestion as apiCreateQuestion
   } from 'api';
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

const newMessage = (content, id, user) => ({
  type: 'NEW_MESSAGE',
  message: {
    content,
    user,
    id
  }
});

const newQuestion = (label, content, id) => ({
  type: 'NEW_QUESTION',
  question: {
    label,
    content,
    id
  }
});

const newMessageThunk = (chatId, content, user) => (dispatch) => {
  apiSendMessage(chatId, content)
  .then((responseJson) => {
    const id = responseJson.message.id;
    dispatch(newMessage(content, id, user));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};

export const newQuestionThunk = (label, content) => (dispatch) => {
  apiCreateQuestion(label, content)
  .then((responseJson) => {
    const id = responseJson.newQuestion.id;
    dispatch(newQuestion(label, content, id));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};


export const sendMessage = (content, chatId) => newMessageThunk(chatId, content, 'YOU');
export const receiveMessage = (content, chatId) => newMessageThunk(chatId, content, 'THEM');

export const openChat = () => ({ type: 'OPEN_CHAT' });
export const closeChat = () => ({ type: 'CLOSE_CHAT' });
export const newChattingPatner = partner => ({ type: 'NEW_PARTNER', partner });
export const joinRoom = room => ({ type: 'JOIN_ROOM', room });

export const onQuestionClick = (questionId, label, content) => (dispatch) => {
  apiCreateQuestion(label, content)
  .then((responseJson) => {
    console.log('responseJson', responseJson);
    dispatch(joinRoom(questionId));
    dispatch(newChattingPatner(questionId)); // TODO get actual chattingPartner handle
    dispatch(openChat());
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};
