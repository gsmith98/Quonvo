import { combineReducers } from 'redux';
import chats, * as chatsSels from './chatsReducer';
import questions from './questionsReducer';

const currentQuestionPage = (state = 0, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION_PAGE':
      return state + 1;
    case 'PREVIOUS_QUESTION_PAGE':
      return state - 1;
    default:
      return state;
  }
};

// TODO answerer a handle rather than a boolean?
const emptyYourQuestion = { answerer: false, question: null };
const yourQuestion = (state = emptyYourQuestion, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return Object.assign({}, emptyYourQuestion, { question: action.question });
    case 'ANSWERER_FOUND':
      return Object.assign({}, state, { answerer: true });
    case 'CLEAR_YOUR_QUESTION':
      return emptyYourQuestion;
    default:
      return state;
  }
};

export default combineReducers({ chats, questions, currentQuestionPage, yourQuestion });

// selectors
export const getQuestions = state => state.questions;
export const getYourQuestion = state => state.yourQuestion.question; 
export const getYourQuestionAnswerer = state => state.yourQuestion.answerer;
export const getCurrentQuestionPage = state => state.currentQuestionPage;
export const getChats = state => chatsSels.getChats(state.chats);
export const getMessages = (state, index) => chatsSels.getMessages(state.chats, index);
export const getChattingPartner = (state, idx) => chatsSels.getChattingPartner(state.chats, idx);
export const getRoom = (state, index) => chatsSels.getRoom(state.chats, index);
