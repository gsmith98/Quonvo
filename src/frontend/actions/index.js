
import {
   signIn as apiSignIn,
   sendMessage as apiSendMessage,
   createQuestion as apiCreateQuestion,
   hotQuestions as apiHotQuestions
   } from 'api';
import { onQuesitonCreate } from './chatActions';

// thunk
export const signIn = (email, password) => (/* dispatch */) => {
  apiSignIn(email, password)
  .then((responseJson) => {
    console.log('responseJson', responseJson);

    // TODO dispatch something to my state saying I'm logged in?
    // TODO otherwise remove from actions and possibly remove SigninBarContainer
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};
// TODO make a thunk that hits API and uses id from response
// or make it take an id and let whoever calls it do the saving

const newMessage = (content, id, user) => ({
  type: 'NEW_MESSAGE',
  message: {
    content,
    user,
    id
  }
});

export const nextQuestionPage = () => ({
  type: 'NEXT_QUESTION_PAGE'
});

export const previousQuestionPage = () => ({
  type: 'PREVIOUS_QUESTION_PAGE'
});

const newQuestion = (subject, content, id, handle) => ({
  type: 'NEW_QUESTION',
  question: {
    subject,
    content,
    id,
    handle
  }
});
const loadQuestions = questions => ({
  type: 'LOAD_QUESTIONS',
  questions,
});

export const loadMoreQuestionsThunk = limit => (dispatch) => {
  apiHotQuestions(limit)
  .then((responseJson) => {
    console.log(responseJson);
    // select fields to keep, don't store whole mongo object
    const qs = responseJson.questions.map(({ id, content, subject, bounty, handle }) =>
    ({ id, content, subject, bounty, handle }));
    dispatch(loadQuestions(qs));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};

export const newMessageThunk = (chatId, content, user) => (dispatch) => {
  apiSendMessage(chatId, content)
  .then((responseJson) => {
    const id = responseJson.message.id;
    dispatch(newMessage(content, id, user));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};

export const newQuestionThunk = (subject, content, handle) => (dispatch) => {
  apiCreateQuestion(subject, content, handle)
  .then((responseJson) => {
    /*
  {
    newQuestion: {
      __v: 0
      _id: "58f94e261463e010512bd16e"
      asker: "58da98a8db5a941c5f02ca43"
      content: "make?"
      createdTime: "2017-04-21T00:11:18.564Z"
      handle: "me"
      live: true
      subject: "Stuff"
      __proto__: Object
    }
    success: true
  }
    */
    console.log('new Q response', responseJson);
    const id = responseJson.newQuestion._id;
    dispatch(newQuestion(subject, content, id, handle));
    dispatch(onQuesitonCreate(id));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};
