
import {
   signIn as apiSignIn,
   sendMessage as apiSendMessage,
   createQuestion as apiCreateQuestion,
   hotQuestions as apiHotQuestions
   } from 'api';

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

const newQuestion = (label, content, id) => ({
  type: 'NEW_QUESTION',
  question: {
    label,
    content,
    id
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

export const newQuestionThunk = (label, content, handle) => (dispatch) => {
  apiCreateQuestion(label, content, handle)
  .then((responseJson) => {
    const id = responseJson.newQuestion.id;
    dispatch(newQuestion(label, content, id));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};
