// import { sendMessage as apiSendMessage } from 'api';

// actions affecting an individual chat

let nextid = 0; // TODO make a thunk that hits API and uses id from response
                // or make it take an id and let whoever calls it do the saving
const newMessage = (content, user, chatIndex) => ({
  type: 'NEW_MESSAGE',
  chatIndex,
  message: {
    content,
    user,
    id: nextid++
  }
});

export const sendMessage = (content, chatIndex) => newMessage(content, 'YOU', chatIndex);
export const receiveMessage = (content, chatIndex) => newMessage(content, 'THEM', chatIndex);

export const openChat = chatIndex => ({ type: 'OPEN_CHAT', chatIndex });
export const closeChat = chatIndex => ({ type: 'CLOSE_CHAT', chatIndex });
export const newChattingPatner = (partner, chatIndex) => ({ type: 'NEW_PARTNER', partner, chatIndex });
export const joinRoom = (room, chatIndex) => ({ type: 'JOIN_ROOM', room, chatIndex });

/* SAVING MITCH THUNK WORK TODO reintegrate

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

*/


export const onQuestionClick = questionId => (dispatch) => {
  const figureOutIndex = () => 0; // TODO make real
  const index = figureOutIndex();

  dispatch(joinRoom(questionId, index));
  dispatch(newChattingPatner(questionId, index)); // TODO get actual chattingPartner handle
  dispatch(openChat(index));
};
