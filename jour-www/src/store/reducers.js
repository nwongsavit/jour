const initialState = {
  account_info: {},
  isLoggedIn: false,
  selectedDate: new Date(),
  modalType: null,
  modalProps: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return Object.assign({}, state, {
      account_info: action.account_info,
      isLoggedIn: action.isLoggedIn,
    });
  case 'LOGOUT':
    return Object.assign({}, state, {
      account_info: initialState.account_info,
      isLoggedIn: action.isLoggedIn,
    });
  case 'SELECTED_STATE':
    return Object.assign({}, state, {
      selectedDate: action.selectedDate,
    });
  case 'OPEN_MODAL':
    return Object.assign({}, state, {
      modalType: action.modalType,
      modalProps: action.modalProps,
    });
  case 'CLOSE_MODAL':
    return Object.assign({}, state, {
      modalType: initialState.modalType,
      modalProps: initialState.modalProps,
    });
  case 'GET_USER':
    return Object.assign({}, state, {
      account_info: action.account_info,
    });
  case 'EDIT_USER':
    return Object.assign({}, state, {
      account_info: action.account_info,
    });
  default:
    return state;
  }
};

export { reducer };
