import { combineReducers } from 'redux';
import messages from './messagesReducer';
import chattingPartner from './chattingPartnerReducer';

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

// TODO could use chatRoom exclusively and not chatopen
const individualChatReducer = combineReducers({ chatopen, chatRoom, chattingPartner, messages });

export default individualChatReducer;

// Selectors below
// They go here because this is the file that understands the state shape.
// Other components should be agnostic and therefore not grab things from state manually

export const getMessages = state => state.messages;
export const getChattingPartner = state => state.chattingPartner;
export const getChatOpen = state => state.chatopen;
export const getRoom = state => state.chatRoom;
