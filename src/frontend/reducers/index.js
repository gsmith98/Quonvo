import { combineReducers } from 'redux';
import messages from './messagesReducer';

const higherLevelReducer = combineReducers({ messages });

export default higherLevelReducer;

// Selectors below
// They go here because this is the file that understands the state shape.
// Other components should be agnostic and therefore not grab things from state manually

export const getMessages = state => state.messages;

// TODO make a higher level state, combineReducers, impement this selector there
export const getChattingPartner = (/* state */) => 'QuonvoKid';
