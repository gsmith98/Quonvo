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

const UIState = (state = { fullArchives: false }, action) => {
  switch (action.type) {
    case 'FULL_ARCHIVES':
      return Object.assign({}, { fullArchives: true });
    case 'CLOSE_ARCHIVES':
      return Object.assign({}, { fullArchives: false });
    default:
      return state;
  }
};

export default combineReducers({
  chats, questions, currentQuestionPage, yourQuestion, newArchives, UIState
});

// selectors
export const getQuestions = state => state.questions;
export const getYourQuestion = state => state.yourQuestion.question;
export const getYourQuestionReady = state => state.yourQuestion.ready;
export const getCurrentQuestionPage = state => state.currentQuestionPage;
export const getChats = state => chatsSels.getChats(state.chats);
export const getMessages = (state, index) => chatsSels.getMessages(state.chats, index);
export const getChattingPartner = (state, idx) => chatsSels.getChattingPartner(state.chats, idx);
export const getRoom = (state, index) => chatsSels.getRoom(state.chats, index);
export const getMyHandle = (state, index) => chatsSels.getMyHandle(state.chats, index);
export const getChatOpen = (state, index) => chatsSels.getChatOpen(state.chats, index);
export const getArchives = state => state.newArchives;
export const areArchivesOpen = state => state.UIState;
