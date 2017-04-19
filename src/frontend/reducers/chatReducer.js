import { combineReducers } from 'redux';

const chattingPartner = (state = null, action) => {
  switch (action.type) {
    case 'NEW_PARTNER':
      return action.partner;
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return state.concat(action.message);
    default:
      return state;
  }
};

const chatopen = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_CHAT':
      return true;
    case 'CLOSE_CHAT':
      return false;
    default:
      return state;
  }
};

const chatRoom = (state = null, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return action.room;
    default:
      return state;
  }
};

// Have to use a reducer-creator function to get chat index properly initialized
const individualChatReducerCreator = (index) => {
  const chatIndex = (state = index) => state;

  // TODO could use chatRoom exclusively and not chatopen
  return combineReducers({
    chatIndex,
    chatopen,
    chatRoom,
    chattingPartner,
    messages
  });
};

export default individualChatReducerCreator;

// Selectors below
// They go here because this is the file that understands the state shape.
// Other components should be agnostic and therefore not grab things from state manually

export const getMessages = state => state.messages;
export const getChattingPartner = state => state.chattingPartner;
export const getChatOpen = state => state.chatopen;
export const getRoom = state => state.chatRoom;
