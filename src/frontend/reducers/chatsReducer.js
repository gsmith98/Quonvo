import chatReducer, {
  getMessages as getChatMessages,
  getChattingPartner as getCCPartner,
  getRoom as getChatRoom,
  getMyHandle as getChatHandle
} from './chatReducer';


// TODO now these action.type strings are in many files. make consts to import?
const chats = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
    case 'NEW_PARTNER':
    case 'JOIN_ROOM':
    case 'SET_HANDLE':
    case 'NOTIFY_MESSAGE':
    case 'OPEN_CHAT': // clears unread messages
    // case 'MINIMIZE_CHAT':
      // use the chatreducer on the relevant chat (also keep things not overwritten by chatreducer)
      return Object.assign(
        {},
        state,
        { [action.chatIndex]: chatReducer(state[action.chatIndex], action) });
    case 'END_CHAT': { // NOTE block scoping to catch the const declaration (lint rule)
      const copy = Object.assign({}, state);
      delete copy[action.chatIndex];
      return copy;
    }
    default:
      return state;
  }
};

export default chats;

// SELECTORS
export const getChats = theChats => theChats;
export const getChat = (theChats, index) => theChats[index];
export const getMessages = (theChats, index) => getChatMessages(getChat(theChats, index));
export const getChattingPartner = (theChats, index) => getCCPartner(getChat(theChats, index));
export const getRoom = (theChats, index) => getChatRoom(getChat(theChats, index));
export const getMyHandle = (theChats, index) => getChatHandle(getChat(theChats, index));
// export const getChatOpen = (theChats, index) => getChatChatOpen(getChat(theChats, index));
