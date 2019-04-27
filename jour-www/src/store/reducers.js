const initialState = {
  account_info: {},
  isLoggedIn: false,
  selectedDate: new Date().getDate(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return Object.assign({}, state, {
      account_info: action.account_info,
      isLoggedIn: true,
    });
  case 'LOGOUT':
    return Object.assign({}, state, {
      account_info: {},
      isLoggedIn: false,
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
