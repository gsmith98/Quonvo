const chattingPartnerReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_PARTNER':
      return action.partner;
    default:
      return state;
  }
};

export default chattingPartnerReducer;
