import chatReducer, {
  getMessages as getChatMessages,
  getChattingPartner as getChatChattingPartner,
  getRoom as getChatRoom
 } from './chatReducer';


const MAX_CHATS = 2;

// initial state is an array of the default states (distinct refs, not copies) of the chatreducer
const initialState = Array(MAX_CHATS).fill(null)
  .map((x, chatIndex) => Object.assign(chatReducer(undefined, {}), { chatIndex }));

// TODO now these action.type strings are in many files. make consts to import?
const chats = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
    case 'NEW_PARTNER':
    case 'OPEN_CHAT':
    case 'CLOSE_CHAT':
    case 'JOIN_ROOM':
      // use the chatreducer on the relevant chat (also keep things not overwritten by chatreducer)
      return [
        ...state.slice(0, action.chatIndex),
        Object.assign({}, state[action.chatIndex], chatReducer(state[action.chatIndex], action)),
        ...state.slice(action.chatIndex + 1)
      ];
    default:
      return state;
  }
};

export default chats;

// SELECTORS
// TODO combine selectors? otherwise we'll have to keep bubbling up lower level selectors
export const getChats = theChats => theChats;
export const getMessages = (theChats, index) => getChatMessages(theChats[index]);
export const getChattingPartner = (theChats, index) => getChatChattingPartner(theChats[index]);
export const getRoom = (theChats, index) => getChatRoom(theChats[index]);
