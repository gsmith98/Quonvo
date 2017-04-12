const questionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return state.concat(action.question);
    default:
      return state;
  }
};

export default questionsReducer;
