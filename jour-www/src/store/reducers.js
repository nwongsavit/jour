const initialState = {
  account_info: {}
};

const reducer = (state = initialState, action) => {
  console.log("reducer", state, action);

  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        account_info: action.account_info
      });
    default:
      return state;
  }
};

export { reducer };
