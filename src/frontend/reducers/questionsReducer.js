const questionsReducer = (state = [], action) => {
  switch (action.type) {
    // case 'NEW_QUESTION':
    //   return state.concat(action.question);
    case 'LOAD_QUESTIONS':
      return [...action.questions, ...state];
    case 'NEW_QUESTIONS':
      return [...state, ...action.questions];
    default:
      return state;
  }
};

export default questionsReducer;
