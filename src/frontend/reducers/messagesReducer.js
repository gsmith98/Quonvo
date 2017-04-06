const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return state.concat(action.message);
    default:
      return state;
  }
};

export default messagesReducer;
