const sampleMessages = [
  { content: 'hi', id: 1, user: 'YOU' },
  { content: 'All Ive ever wanted is you my friend', id: 2, user: 'YOU' },
  { content: 'hiya', id: 3, user: 'THEM' },
  { content: 'wouldnt it be nice if we could wake up way before the end and make things wrong?',
    id: 4,
    user: 'THEM' }];

const messagesReducer = (state = sampleMessages, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return state.concat(action.message);
    default:
      return state;
  }
};

export default messagesReducer;
