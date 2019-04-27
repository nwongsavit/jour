const initialState = {
  account_info: {},
  selectedDate: new Date().getDate(),
};

const reducer = (state = initialState, action) => {
  console.log('reducer', state, action);

  switch (action.type) {
  case 'LOGIN':
    return Object.assign({}, state, {
      account_info: action.account_info,
    });
  case 'SELECTED_STATE':
    return Object.assign({}, state, {
      selectedDate: action.selectedDate,
    });
  default:
    return state;
  }
};

export { reducer };
