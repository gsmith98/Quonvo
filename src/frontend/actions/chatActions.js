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


export const onQuestionClick = (questionId, handle) => (dispatch) => {
  const figureOutIndex = () => 0; // TODO make real
  const index = figureOutIndex();

  dispatch(joinRoom(questionId, index));
  dispatch(newChattingPatner(handle, index));
  dispatch(openChat(index));
};
