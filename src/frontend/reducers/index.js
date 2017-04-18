import { combineReducers } from 'redux';
import chats, * as chatsSels from './chatsReducer';
import questions from './questionsReducer';


export default combineReducers({ chats, questions });

// selectors
export const getQuestions = state => state.questions;

export const getChats = state => chatsSels.getChats(state.chats);
export const getMessages = (state, index) => chatsSels.getMessages(state.chats, index);
export const getChattingPartner = (state, idx) => chatsSels.getChattingPartner(state.chats, idx);
export const getRoom = (state, index) => chatsSels.getRoom(state.chats, index);
