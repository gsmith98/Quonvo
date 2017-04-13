import {
   signIn as apiSignIn,
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
// TODO maybe augment the questions to a better form for the better
export const loadMoreQuestionsThunk = limit => (dispatch) => {
  apiHotQuestions(limit)
  .then((responseJson) => {
    dispatch(loadQuestions(responseJson.questions));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};

export const newQuestionThunk = (label, content) => (dispatch) => {
  apiCreateQuestion(label, content)
  .then((responseJson) => {
    const id = responseJson.newQuestion.id;
    dispatch(newQuestion(label, content, id));
  })
  .catch((err) => {
    console.log('error');
    throw err;
  });
};

