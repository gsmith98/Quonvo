import chatReducer, {
  getMessages as getChatMessages,
  getChattingPartner as getChatChattingPartner,
  getRoom as getChatRoom,
  getMyHandle as getChatHandle,
  getChatOpen as getChatChatOpen
} from './chatReducer';


// TODO now these action.type strings are in many files. make consts to import?
const chats = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
    case 'NEW_PARTNER':
    case 'OPEN_CHAT':
    case 'CLOSE_CHAT':
    case 'JOIN_ROOM':
    case 'SET_HANDLE':
      // use the chatreducer on the relevant chat (also keep things not overwritten by chatreducer)
      return Object.assign(
        {},
        state,
        { [action.chatIndex]: chatReducer(state[action.chatIndex], action) });
    default:
      return state;
  }
};

export default chats;

// SELECTORS
export const getChats = theChats => theChats;
export const getMessages = (theChats, index) => getChatMessages(theChats[index]);
export const getChattingPartner = (theChats, index) => getChatChattingPartner(theChats[index]);
export const getRoom = (theChats, index) => getChatRoom(theChats[index]);
export const getMyHandle = (theChats, index) => getChatHandle(theChats[index]);
export const getChatOpen = (theChats, index) => getChatChatOpen(theChats[index]);
