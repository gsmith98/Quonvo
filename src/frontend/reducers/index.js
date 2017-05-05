import { combineReducers } from 'redux';
import chats, * as chatsSels from './chatsReducer';
import questions from './questionsReducer';

const currentQuestionPage = (state = 0, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION_PAGE':
      return state + 1;
    case 'PREVIOUS_QUESTION_PAGE':
      return state - 1;
    case 'FIRST_QUESTION_PAGE':
      return 0;
    default:
      return state;
  }
};

const emptyYourQuestion = { ready: false, question: null };
const yourQuestion = (state = emptyYourQuestion, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return Object.assign({}, emptyYourQuestion, { question: action.question });
    case 'ANSWERER_FOUND':
      return Object.assign({}, state, { ready: true });
    case 'CLEAR_YOUR_QUESTION':
      return emptyYourQuestion;
    default:
      return state;
  }
};

const newArchives = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ARCHIVES':
      return action.archives;
    default:
      return state;
  }
};

const newRankings = (state = [], action) => {
  switch (action.type) {
    case 'NEW_RANKINGS':
      return action.rankings;
    default:
      return state;
  }
};

const EMPTY = 'empty-0';
const ARCHIVES = 'archives-0';
const RANKINGS = 'rankings-0';
const chat = id => `chat-${id}`;
const UIState = (state = EMPTY, action) => {
  switch (action.type) {
    case 'FULL_ARCHIVES':
      return ARCHIVES;
    case 'CLOSE_ARCHIVES':
      return state === ARCHIVES ? EMPTY : state;
    case 'OPEN_CHAT':
      return chat(action.chatIndex);
    case 'MINIMIZE_CHAT':
    case 'END_CHAT':
      return state === chat(action.chatIndex) ? EMPTY : state;
    case 'FULL_RANKINGS':
      return RANKINGS;
    case 'CLOSE_RANKINGS':
      return state === RANKINGS ? EMPTY : state;
    default:
      return state;
  }
};

export default combineReducers({
  chats, questions, currentQuestionPage, yourQuestion, newArchives, UIState, newRankings
});

// selectors
export const getQuestions = state => state.questions;
export const getYourQuestion = state => state.yourQuestion.question;
export const getYourQuestionReady = state => state.yourQuestion.ready;
export const getCurrentQuestionPage = state => state.currentQuestionPage;
export const getChats = state => state.chats;
export const getChat = (state, index) => chatsSels.getChat(state.chats, index);
export const getMessages = (state, index) => chatsSels.getMessages(state.chats, index);
export const getChattingPartner = (state, idx) => chatsSels.getChattingPartner(state.chats, idx);
export const getRoom = (state, index) => chatsSels.getRoom(state.chats, index);
export const getMyHandle = (state, index) => chatsSels.getMyHandle(state.chats, index);
// export const getChatOpen = (state, index) => chatsSels.getChatOpen(state.chats, index);
export const getArchives = state => state.newArchives;
export const areArchivesOpen = state => state.UIState === ARCHIVES;
export const areRankingsOpen = state => state.UIState === RANKINGS;
export const getUIstate = state => state.UIState;
export const getVisibleChatIndex = (state) => {
  const [type, index] = getUIstate(state).split('-');
  return type === 'chat' ? index : null;
};
export const getVisibleChat = (state) => {
  const [type, index] = getUIstate(state).split('-');
  return type === 'chat' ? Object.assign({}, getChat(state, index), { chatIndex: index }) : null;
};
export const isQMine = (state, id) => getYourQuestion(state) && getYourQuestion(state).id === id;
