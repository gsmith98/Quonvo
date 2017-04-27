// import { sendMessage as apiSendMessage } from 'api';
import {
   updateQuestion as apiUpdateQuestion,
   endChat as apiEndChat
   } from 'api';
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
export const minimizeChat = chatIndex => ({ type: 'MINIMIZE_CHAT', chatIndex });
export const endChat = chatIndex => ({ type: 'END_CHAT', chatIndex });
export const newChattingPartner = (partner, chatIndex) => ({ type: 'NEW_PARTNER', partner, chatIndex });
export const joinRoom = (room, chatIndex) => ({ type: 'JOIN_ROOM', room, chatIndex });
export const setHandle = (handle, chatIndex) => ({ type: 'SET_HANDLE', handle, chatIndex });
export const questionReady = () => ({ type: 'ANSWERER_FOUND' });

export const endChatThunk = (
  messages,
  questionId,
  askerHandle,
  rating,
  questionAnswered
) => (dispatch) => {
  console.log('thunk', messages)
  dispatch(closeChat(questionId));
  apiEndChat(messages, questionId, askerHandle, rating, questionAnswered);
};

export const onQuestionClick = (questionId, theirHandle, yourHandle) => (dispatch) => {
  dispatch(joinRoom(questionId, questionId));
  dispatch(setHandle(yourHandle, questionId));
  dispatch(newChattingPartner(theirHandle, questionId));
  dispatch(openChat(questionId));
  apiUpdateQuestion(questionId);
};

export const onQuestionCreate = (questionId, handle) => (dispatch) => {
  dispatch(joinRoom(questionId, questionId));
  dispatch(setHandle(handle, questionId));
};
